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
        title: "Projet Coupe de Robotique 2026",
        description: "Robot qui participera à la coupe de robotique 2026.",
        imageUrl: "/assets/project1.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "Projet Poubelle",
        description: "Robot poubelle qui intercepte les déchets en vol",
        imageUrl: "/assets/project2.jpg",
        link: "#"
    }
        {
        id: 3,
        title: "Projet Karting",
        description: "Kart qui roulera",
        imageUrl: "/assets/project3.jpg",
        link: "#"
    },
];
