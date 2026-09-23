"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { DoneIcon } from "@/components/site/icons";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";
import { useWorks } from "@/components/site/works-context";

interface RealisationItem {
  code: string;
  category: string;
  short: string;
  domain: string;
  title: string;
  desc: string;
  result: string;
  /** Three or four words under the name on the picker card. */
  tag: string;
  /** Screen capture of the demo, 16:9. Absent until the demo is shot. */
  video?: string;
  /** Still frame: poster for the video, or the image of a live demo. */
  poster?: string;
}

/**
 * The projects, one at a time: the demo with its write-up beside it, on the
 * page ground rather than in a card.
 *
 * The arrows run through every project of the page, not just the ones of the
 * current domain. Past the last automation project the next arrow lands on
 * the first custom-software one, and the domain selected up in the hero
 * follows along. The cards underneath only ever show the projects of the
 * domain being read — three, then two, then two — so they stay a picker for
 * where you are rather than a list of everything.
 *
 * The demo is a plain video element with the browser's own controls: a click
 * plays it where it is, and its control bar carries the full-screen button,
 * which is the one thing a custom bar would have had to reimplement badly.
 */
export function WorksList({
  items,
  categories,
  emptyCategory,
  videoPending,
  countLabel,
  prevLabel,
  nextLabel,
  filterCta,
  contactHref,
}: {
  items: readonly RealisationItem[];
  categories: readonly { id: string; label: string; short: string; icon: string }[];
  emptyCategory: string;
  videoPending: string;
  countLabel: string;
  prevLabel: string;
  nextLabel: string;
  filterCta: string;
  contactHref: string;
}) {
  const { category, setCategory } = useWorks();

  /* Every project in domain order: this is the order the arrows walk, and
     the only place the crossing from one domain to the next is defined. */
  const flat = categories.flatMap((c) =>
    items.filter((item) => item.category === c.id),
  );

  const [index, setIndex] = useState(0);
  const [shownCategory, setShownCategory] = useState(category);
  const rowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  /* Told apart from a pause the visitor asked for: scrolling away pauses
     the demo too, and without this the video would refuse to start again
     when they came back, thinking they had stopped it themselves. */
  const autoPausing = useRef(false);
  const stoppedByVisitor = useRef(false);

  /* A domain picked up in the hero opens on its first project. Adjusted
     during render rather than in an effect, so the row never shows the
     previous domain's project for a frame. */
  if (category !== shownCategory) {
    setShownCategory(category);
    const first = flat.findIndex((item) => item.category === category);
    setIndex(first >= 0 ? first : 0);
  }

  const active = flat[Math.min(index, Math.max(0, flat.length - 1))];

  /** Step through the whole page, carrying the domain along at the seams. */
  const go = (delta: number) => {
    const next = Math.max(0, Math.min(flat.length - 1, index + delta));
    if (next === index) return;
    setIndex(next);
    const nextCategory = flat[next].category;
    if (nextCategory !== category) {
      setCategory(nextCategory);
      setShownCategory(nextCategory);
    }
  };

  /* The demo starts on its own once it is in front of the visitor, and
     stops when it leaves. A project page that waits for a click on a play
     button shows a still image to everyone who does not click.

     Muted, because no browser will autoplay a video with sound. The
     controls are still there, so anyone who wants the sound turns it on.
     Nothing starts for a visitor who asked for less motion. */
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    stoppedByVisitor.current = false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Set on the element as well as in the markup: React does not always
    // reflect `muted` as an attribute, and an unmuted video is blocked.
    el.muted = true;

    const onPause = () => {
      if (autoPausing.current) {
        autoPausing.current = false;
        return;
      }
      if (!el.ended) stoppedByVisitor.current = true;
    };
    const onPlay = () => {
      stoppedByVisitor.current = false;
    };
    el.addEventListener("pause", onPause);
    el.addEventListener("play", onPlay);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!stoppedByVisitor.current) {
              // A refused autoplay is not an error worth surfacing: the
              // visitor still has the controls.
              void el.play().catch(() => {});
            }
          } else if (!el.paused) {
            autoPausing.current = true;
            el.pause();
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      el.removeEventListener("pause", onPause);
      el.removeEventListener("play", onPlay);
    };
  }, [active?.code]);

  // Arrow keys drive the row once it has focus.
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      // Left to the video's own seeking once it has the focus.
      if ((e.target as HTMLElement)?.tagName === "VIDEO") return;
      e.preventDefault();
      go(e.key === "ArrowRight" ? 1 : -1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  });

  if (!active) {
    return (
      <div className="works-empty">
        <p>{emptyCategory}</p>
        <Link href={contactHref} className="works-empty-cta">
          {filterCta}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    );
  }

  // The picker only ever holds the domain currently being read.
  const siblings = flat.filter((item) => item.category === active.category);
  const localIndex = siblings.findIndex((item) => item.code === active.code);
  const ink = Math.max(
    0,
    categories.findIndex((c) => c.id === active.category),
  );


  return (
    <div className="works" data-ink={ink}>
      <div ref={rowRef} tabIndex={-1} className="works-row">
        {/* Keyed on the project, so switching remounts the block: it plays
            its entrance again and the video starts over. */}
        <div key={active.code} className="works-open">
          <Reveal className="works-media-in reveal-left">
            {active.video ? (
              <video
                ref={videoRef}
                className="work-media"
                src={active.video}
                poster={active.poster}
                preload="metadata"
                controls
                muted
                playsInline
                aria-label={active.title}
              />
            ) : (
              <div className="work-media">
                <span className="work-media-fill" aria-hidden />
                <span className="works-play" aria-hidden>
                  <Play />
                </span>
                <span className="works-pending">{videoPending}</span>
              </div>
            )}
          </Reveal>

          <Reveal delay={160} className="work-copy works-copy-in reveal-right">
            <span className="works-panel-index">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(flat.length).padStart(2, "0")} {countLabel}
            </span>
            <span className="works-panel-domain">{active.domain}</span>

            <h3 className="works-panel-title">{active.title}</h3>
            <p className="works-panel-desc">{active.desc}</p>

            <p className="works-panel-result">
              <DoneIcon aria-hidden />
              {active.result}
            </p>
          </Reveal>
        </div>
      </div>

      {/* The whole run at a glance: one bar per project, grouped by domain
          and each group named. Telling the visitor in words that something
          comes after the last card never landed; showing seven bars in three
          named families, with one of them lit, needs no explaining. */}
      <div className="works-track">
        {categories.map((c, ci) => {
          const group = flat.filter((item) => item.category === c.id);
          if (group.length === 0) return null;
          const here = c.id === active.category;
          return (
            <span
              key={c.id}
              className="works-track-group"
              data-ink={ci}
              data-here={here}
            >
              <span className="works-track-name">{c.short}</span>
              <span className="works-track-bars">
                {group.map((item) => {
                  const at = flat.findIndex((f) => f.code === item.code);
                  return (
                    <button
                      key={item.code}
                      type="button"
                      className="works-track-bar"
                      data-on={at === index}
                      aria-label={item.title}
                      aria-current={at === index ? "true" : undefined}
                      onClick={() => go(at - index)}
                    />
                  );
                })}
              </span>
            </span>
          );
        })}
      </div>

      <div className="works-nav">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label={prevLabel}
          className="works-nav-btn"
        >
          <ArrowLeft aria-hidden className="size-4" />
        </button>

        {/* One card per project of this domain: the still, the name and a
            few words on what it does. */}
        <span className="works-strip">
          {siblings.map((item, i) => (
            <button
              key={item.code}
              type="button"
              onClick={() => setIndex(flat.findIndex((f) => f.code === item.code))}
              aria-current={i === localIndex ? "true" : undefined}
              className={cn("works-stamp", i === localIndex && "is-on")}
            >
              <span className="works-stamp-shot">
                {item.poster ? (
                  <Image
                    src={item.poster}
                    alt=""
                    width={320}
                    height={180}
                    sizes="200px"
                  />
                ) : (
                  <span className="work-media-fill" aria-hidden />
                )}
              </span>

              <span className="works-stamp-copy">
                <span className="works-stamp-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="works-stamp-name">{item.short}</span>
                <span className="works-stamp-tag">{item.tag}</span>
              </span>
            </button>
          ))}

        </span>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === flat.length - 1}
          aria-label={nextLabel}
          className="works-nav-btn"
        >
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
    </div>
  );
}
