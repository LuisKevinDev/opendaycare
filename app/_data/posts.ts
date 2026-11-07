export type PostKind = "logro" | "actividad" | "anuncio";

export type Post = {
  readonly id: string;
  readonly kind: PostKind;
  readonly avatarInitial: string;
  readonly author: string;
  readonly time: string;
  readonly audience: string;
  readonly text: string;
  readonly photo?: { readonly caption: string };
  readonly likes: number;
  readonly comments: number;
};

export const POSTS: readonly Post[] = [
  {
    id: "logro-mateo",
    kind: "logro",
    avatarInitial: "M",
    author: "Mateo",
    time: "14:20",
    audience: "Para: familia de Mateo",
    text: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    id: "actividad-mateo",
    kind: "actividad",
    avatarInitial: "M",
    author: "Mateo",
    time: "09:40",
    audience: "Para: familia de Mateo",
    text: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: { caption: "Foto · pintando con témperas" },
    likes: 5,
    comments: 2,
  },
  {
    id: "anuncio-sala",
    kind: "anuncio",
    avatarInitial: "",
    author: "Anuncio general",
    time: "07:50",
    audience: "Para: toda la sala",
    text: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
] as const;
