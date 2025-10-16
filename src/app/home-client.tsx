'use client';
import { PlusIcon } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";

export default function HomeClient() {
  const { openModal } = useModal();

  return (
    <button
      onClick={openModal}
      className="bg-[#4A69E0] text-white px-4 py-3 rounded-sm w-full flex items-center justify-center gap-2 mt-8"
    >
      Adicionar Nova Transação <PlusIcon className="w-4 h-4" />
    </button>
  );
}