/**
 * The drawn icon set, inlined from `public/svg-icons`.
 *
 * Inlined rather than loaded as files, because every one of them paints in
 * `currentColor` and sizes itself in `em`: an <img> would lose both, and the
 * icons would stop taking the colour and the size of whatever holds them.
 *
 * They replace the default icon-library glyphs wherever one of them says the
 * same thing. Generated from the source files, so the width, height and
 * viewBox are exactly those of the originals.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function AutomationOutlineIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.4 17.25q-1.05.875-2.187.8t-1.988-.775t-1.162-1.837t.412-2.338L4.35 10q-.625-.55-.987-1.325T3 7q0-1.65 1.175-2.825T7 3t2.825 1.175T11 7T9.825 9.825T7 11q-.225 0-.45-.025t-.425-.075L4.2 14.15q-.275.45-.175.888t.425.712t.775.313t.875-.313l10.5-9.025q1.05-.875 2.2-.788t2 .788t1.15 1.838t-.425 2.337L19.65 14q.625.55.988 1.325T21 17q0 1.65-1.175 2.825T17 21t-2.825-1.175T13 17t1.175-2.825T17 13q.225 0 .438.025t.412.075l1.95-3.25q.275-.45.175-.888t-.425-.712t-.775-.312t-.875.312zm1.013-8.837Q9 7.825 9 7t-.587-1.412T7 5t-1.412.588T5 7t.588 1.413T7 9t1.413-.587m10 10Q19 17.825 19 17t-.587-1.412T17 15t-1.412.588T15 17t.588 1.413T17 19t1.413-.587M17 17"/></svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M8 4h8V2h2v2h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V2h2zM5 8v12h14V8zm2 3h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm0 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2H7z"/></svg>
  );
}

export function CodeOutlinedIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M516 673c0 4.4 3.4 8 7.5 8h185c4.1 0 7.5-3.6 7.5-8v-48c0-4.4-3.4-8-7.5-8h-185c-4.1 0-7.5 3.6-7.5 8zm-194.9 6.1l192-161c3.8-3.2 3.8-9.1 0-12.3l-192-160.9A7.95 7.95 0 0 0 308 351v62.7c0 2.4 1 4.6 2.9 6.1L420.7 512l-109.8 92.2a8.1 8.1 0 0 0-2.9 6.1V673c0 6.8 7.9 10.5 13.1 6.1M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32m-40 728H184V184h656z"/></svg>
  );
}

export function ConnectIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M10 21c-2.5 2.5-5 2-7 0s-2.5-4.5 0-7l3-3l7 7zm4-18c2.5-2.5 5-2 7.001 0s2.499 4.5 0 7l-3 3L11 6zm-3 7l-2.5 2.5zm3 3l-2.5 2.5z"/></svg>
  );
}

export function BarChartIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M4 4v16"/><path d="M4 20h16"/><path d="M8 11v7"/><path d="M12 11v7"/><path d="M16 11v7"/></g></svg>
  );
}

export function DoneIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/></svg>
  );
}

export function FileIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><g fill="currentColor"><path d="M6.5 12a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1z"/><path fillRule="evenodd" d="M11.185 1H4.5A1.5 1.5 0 0 0 3 2.5v15A1.5 1.5 0 0 0 4.5 19h11a1.5 1.5 0 0 0 1.5-1.5V7.202a1.5 1.5 0 0 0-.395-1.014l-4.314-4.702A1.5 1.5 0 0 0 11.185 1M4 2.5a.5.5 0 0 1 .5-.5h6.685a.5.5 0 0 1 .369.162l4.314 4.702a.5.5 0 0 1 .132.338V17.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5z" clipRule="evenodd"/><path d="M11 7h5.5a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0z"/></g></svg>
  );
}

export function GraphIncreaseIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 3.5v11a2 2 0 0 0 2 2h11"/><path d="m6.5 12.5l3-3l2 2l5-5"/><path d="M16.5 9.5v-3h-3"/></g></svg>
  );
}

export function LampOutlineIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g className="lamp-outline"><g fill="currentColor" className="Vector"><path fillRule="evenodd" d="M9 21a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1m0-5.575a1 1 0 0 1 1 1v.398c0 .374.303.677.677.677h2.646a.677.677 0 0 0 .677-.677V16.5a1 1 0 1 1 2 0v.323a2.676 2.676 0 0 1-2.677 2.677h-2.646A2.676 2.676 0 0 1 8 16.823v-.398a1 1 0 0 1 1-1" clipRule="evenodd"/><path d="M14.228 16.846c.137.42.59.654.995.476a8 8 0 1 0-6.367.034c.406.174.857-.064.99-.486l.087-.278c.132-.421-.106-.866-.506-1.052a6.109 6.109 0 1 1 5.206-.028c-.399.19-.632.637-.495 1.058z"/></g></g></svg>
  );
}

export function NetworkIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5"><path d="M8.992 6c0-1.414 0-2.121.44-2.56C9.87 3 10.578 3 11.992 3s2.121 0 2.56.44c.44.439.44 1.146.44 2.56s0 2.121-.44 2.56c-.438.44-1.146.44-2.56.44s-2.121 0-2.56-.44c-.44-.439-.44-1.146-.44-2.56Zm-6 12c0-1.414 0-2.121.44-2.56C3.87 15 4.578 15 5.992 15s2.122 0 2.56.44c.44.439.44 1.146.44 2.56s0 2.121-.44 2.56c-.438.44-1.146.44-2.56.44s-2.121 0-2.56-.44c-.44-.439-.44-1.146-.44-2.56Zm12 0c0-1.414 0-2.121.44-2.56c.439-.44 1.146-.44 2.56-.44s2.121 0 2.56.44c.44.439.44 1.146.44 2.56s0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44s-2.121 0-2.56-.44c-.44-.439-.44-1.146-.44-2.56Z"/><path strokeLinecap="round" d="M11.992 9v3m6 3c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.082-1.083C16.39 12 15.924 12 14.992 12h-6c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.152.367-.152.833-.152 1.765"/></g></svg>
  );
}

export function PencilLineIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 21h8M15 5l4 4m2.174-2.188a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
  );
}

export function PhoneLinearIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M18.6763 19.9631C19.1917 19.9122 19.6399 19.6343 20.0011 19.254L21.4217 17.7584C22.3806 16.7489 22.1102 15.0182 20.8833 14.312L18.9728 13.2123C18.1672 12.7486 17.1858 12.8848 16.5562 13.5477L16.1007 14.0272C16.1007 14.0272 15.0181 15.167 12.0631 12.0559C9.10812 8.94484 10.1907 7.80507 10.1907 7.80507L10.4775 7.50311C11.1841 6.75924 11.2507 5.56497 10.6342 4.6931L9.37326 2.90961C8.61028 1.8305 7.13596 1.68795 6.26145 2.60864L4.69185 4.26114C4.25823 4.71766 3.96765 5.30945 4.00289 5.96594C4.09304 7.64546 4.81072 11.259 8.81536 15.4752C13.0621 19.9462 17.0468 20.1239 18.6763 19.9631Z"/></svg>
  );
}

export function PricetagOutlineIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M435.25 48h-122.9a14.46 14.46 0 0 0-10.2 4.2L56.45 297.9a28.85 28.85 0 0 0 0 40.7l117 117a28.85 28.85 0 0 0 40.7 0L459.75 210a14.46 14.46 0 0 0 4.2-10.2v-123a28.66 28.66 0 0 0-28.7-28.8"/><path fill="currentColor" d="M384 160a32 32 0 1 1 32-32a32 32 0 0 1-32 32"/></svg>
  );
}

export function RobotLineIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 12v2m6-2v2m-3-9v2m0-2a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm-7 6h-.5a1.5 1.5 0 0 0 0 3H5zm14 0h.5a1.5 1.5 0 0 1 0 3H19zM8 19h8a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3Z"/></svg>
  );
}

export function ScreenIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M11 17H4a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7v2h3a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h3zM4 5h16a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1" clipRule="evenodd"/></svg>
  );
}

export function TimeLineIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v5l3 3m6-3a9 9 0 1 1-18 0a9 9 0 0 1 18 0"/></svg>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M12.1 2a9.8 9.8 0 0 0-5.4 1.6l6.4 6.4a2.1 2.1 0 0 1 .2 3a2.1 2.1 0 0 1-3-.2L3.7 6.4A9.84 9.84 0 0 0 2 12.1a10.14 10.14 0 0 0 10.1 10.1a11 11 0 0 0 2.6-.3l6.7 6.7a5 5 0 0 0 7.1-7.1l-6.7-6.7a11 11 0 0 0 .3-2.6A10 10 0 0 0 12.1 2m8 10.1a7.6 7.6 0 0 1-.3 2.1l-.3 1.1l.8.8l6.7 6.7a2.88 2.88 0 0 1 .9 2.1A2.72 2.72 0 0 1 27 27a2.9 2.9 0 0 1-4.2 0l-6.7-6.7l-.8-.8l-1.1.3a7.6 7.6 0 0 1-2.1.3a8.27 8.27 0 0 1-5.7-2.3A7.63 7.63 0 0 1 4 12.1a8.3 8.3 0 0 1 .3-2.2l4.4 4.4a4.14 4.14 0 0 0 5.9.2a4.14 4.14 0 0 0-.2-5.9L10 4.2a6.5 6.5 0 0 1 2-.3a8.27 8.27 0 0 1 5.7 2.3a8.5 8.5 0 0 1 2.4 5.9"/></svg>
  );
}

export function WebPageIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none"><rect width="40" height="32" x="4" y="8" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" rx="3"/><path stroke="currentColor" strokeWidth="4" d="M4 11a3 3 0 0 1 3-3h34a3 3 0 0 1 3 3v9H4z"/><circle r="2" fill="currentColor" transform="matrix(0 -1 -1 0 10 14)"/><circle r="2" fill="currentColor" transform="matrix(0 -1 -1 0 16 14)"/></g></svg>
  );
}

export function WebIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinejoin="round" d="M3 24a21 21 0 1 0 42 0a21 21 0 1 0-42 0"/><path strokeLinejoin="round" d="M15 24a9 21 0 1 1 18 0a9 21 0 1 1-18 0"/><path strokeLinecap="round" d="M4.5 31h39m-39-14h39"/></g></svg>
  );
}

export function ZoomIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"/></svg>
  );
}
