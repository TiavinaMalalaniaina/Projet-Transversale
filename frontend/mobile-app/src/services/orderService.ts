export type Order = {
  id: number;
  client: string;
  article: string;
  quantite: number;
  date: string;
  statut: "En attente" | "En cours" | "Livrée";
};

// Données initiales
let commandes: Order[] = [
  { id: 1, client: "Jean Dupont", article: "Huile moteur", quantite: 2, date: "2025-09-08", statut: "En attente" },
  { id: 2, client: "Marie Curie", article: "Bougie", quantite: 4, date: "2025-09-07", statut: "Livrée" },
];

// Retourne toutes les commandes
export const getOrders = () => commandes;

// Ajoute une nouvelle commande
export const addOrder = (commande: Omit<Order, "id">) => {
  const newOrder: Order = { id: commandes.length + 1, ...commande };
  commandes.push(newOrder);
  return newOrder;
};
