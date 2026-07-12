import Modal from "@/components/Modal/Modal";
import MessagesView from "@/components/Messages/MessagesView";

/**
 * Version interceptée de /messages — s'affiche en modale par-dessus
 * la page courante lors d'une navigation cliquée depuis l'app (Link).
 * app/messages/page.tsx reste la version pleine page pour un accès direct.
 */
export default function MessagesModal() {
  return (
    <Modal>
      <MessagesView />
    </Modal>
  );
}
