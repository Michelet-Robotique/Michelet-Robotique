export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Projet Poubelle",
        description: "Robot poubelle qui intercepte les déchets en vol",
        imageUrl: "/assets/project2.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "Projet Karting Électrique",
        description: "Conception et réalisation d'un kart électrique, avec une motorisation optimisée.",
        imageUrl: "/assets/project3.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "Plus de projets à venir !",
        description: "Le club de robotique ne s'arrête jamais. Restez à l'écoute pour nos prochaines créations !",
        imageUrl: "/assets/project4.jpg",
        link: "#"
    },
];
