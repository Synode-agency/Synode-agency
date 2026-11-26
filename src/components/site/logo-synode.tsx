import Image from "next/image";

/**
 * LE LOGO DE SYNODE, RECOMPOSÉ (26/11/2026, demande d'Antonino) : son
 * symbole, le N (`public/logo/synode-blanc.png` et `synode.png`, le bleu),
 * entre « SY » et « ODE » écrits en Manrope. Les proportions sont celles de son logo d'origine
 * (`refonte.css`, « LE LOGO DE SYNODE ») : la hauteur des lettres, la
 * moitié de celle du N ; l'écart de Y au N et du N au O.
 *
 * - `deuxN` : le N blanc et le N foncé (le fichier bleu, peint en noir par
 *   `refonte.css`) l'un sur l'autre, pour la barre du
 *   haut, qui montre l'un ou l'autre selon le fond (`LogoEntete`). Sans :
 *   le N foncé seul, lettres noires (le pied de page).
 * - `decoratif` : caché aux lecteurs d'écran, quand le lien qui l'entoure
 *   porte déjà le nom. Sinon, une image nommée « Synode ».
 */
export function LogoSynode({
  className,
  deuxN = false,
  decoratif = false,
}: {
  className?: string;
  deuxN?: boolean;
  decoratif?: boolean;
}) {
  const nom = decoratif ? { "aria-hidden": true } : { role: "img", "aria-label": "Synode" };
  return (
    <span className={className ? `logo-mot ${className}` : "logo-mot"} {...nom}>
      <span className="logo-mot-lettres logo-mot-sy" aria-hidden="true">
        SY
      </span>
      <span className="logo-mot-n" aria-hidden="true">
        <span className="logo-mot-tourne">
          {deuxN ? (
            <Image
              className="logo-mot-image logo-mot-n-blanc"
              src="/logo/synode-blanc.png"
              alt=""
              width={1448}
              height={1086}
              sizes="64px"
              loading="eager"
            />
          ) : null}
          <Image
            className="logo-mot-image logo-mot-n-bleu"
            src="/logo/synode.png"
            alt=""
            width={1448}
            height={1086}
            sizes="64px"
            loading={deuxN ? "eager" : undefined}
          />
        </span>
      </span>
      <span className="logo-mot-lettres logo-mot-ode" aria-hidden="true">
        ODE
      </span>
    </span>
  );
}
