'use client';
import { useEffect, useRef, useState } from "react";

interface BottomSheetProps {
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function BottomSheet({ children, isOpen, setIsOpen }: BottomSheetProps) {
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef(0);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        // Permite drag em toda a área da barrinha, não apenas no elemento exato
        const target = e.target as Element;
        if(target.closest(".drag-handle") || target.closest(".drag-area")){
            e.preventDefault(); // Previne scroll da página
            setIsDragging(true);
            startY.current = e.touches[0].clientY;
        }
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        
        e.preventDefault(); // Previne scroll da página durante o drag

        const currentY = e.touches[0].clientY;
        const diffY = currentY - startY.current;

        if(diffY > 0){
            setDragY(diffY);
        }
    }

    const handleTouchEnd = () => {
        if (!isDragging) return;
        
        setIsDragging(false);
        
        if (dragY > 150) {
          setIsOpen(false);
          setDragY(0);
        } else {
          setDragY(0);
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as Element).closest('.drag-handle')) {
          setIsDragging(true);
          startY.current = e.clientY;
        }
    };
      
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const diff = e.clientY - startY.current;
        if (diff > 0) {
          setDragY(diff);
        }
    };
       
    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
         
        if (dragY > 150) {
          setIsOpen(false);
          setDragY(0);
        } else {
          setDragY(0);
        }
    };

     function handleClose() {
        if(isDragging){
            setIsDragging(false);
            setDragY(0);
        } else {
            setIsOpen(false);
            setDragY(0);
        }
    }

    useEffect(() => {
        if(isDragging) {
            window.document.addEventListener("mousemove", handleMouseMove)
            window.document.addEventListener("mouseup", handleMouseUp)

            return () => {
                window.document.removeEventListener("mousemove", handleMouseMove)
                window.document.removeEventListener("mouseup", handleMouseUp)
            }
        }
    }, [isDragging, dragY]);

    // Controla o scroll do body quando modal está aberto
    useEffect(() => {
        if(isOpen){
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'auto';
            }
        }
    }, [isOpen]);

    return (
        <>
            <style jsx>{`
                .modal-backdrop {
                    animation: fadeIn 0.3s ease-out;
                }
                .modal-content {
                    animation: slideUp 0.3s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                
                /* Melhorias para scroll no mobile */
                .modal-content {
                    -webkit-overflow-scrolling: touch;
                    overscroll-behavior: contain;
                }
                
                /* Scrollbar customizada para mobile */
                .modal-content::-webkit-scrollbar {
                    width: 4px;
                }
                
                .modal-content::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                .modal-content::-webkit-scrollbar-thumb {
                    background: rgba(148, 163, 184, 0.3);
                    border-radius: 2px;
                }
            `}</style>
            <div>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                      

                        <div
                                className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 modal-backdrop"
                                onClick={handleClose}
                            />

                        {/* Modal */}
                        <div 
                            className="fixed inset-x-0 bottom-0 z-50 modal-content" 
                            style={{
                                transform: `translateY(${dragY}px)`,
                                transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                                opacity: isDragging ? Math.max(0.5, 1 - dragY / 300) : 1,
                                maxHeight: '90vh', // Altura máxima de 90% da viewport
                                touchAction: 'pan-y' // Permite scroll vertical no mobile
                            }}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onMouseDown={handleMouseDown}
                        >
                        <div className="bg-slate-800 rounded-t-[40px] flex flex-col max-h-full">
                            {/* Área de drag - mais fácil de tocar no mobile */}
                            <div 
                                className="flex justify-center py-4 drag-area flex-shrink-0"
                                style={{ touchAction: 'none' }}
                            >
                                <div 
                                    className="w-20 h-8 flex items-center justify-center drag-handle cursor-grab active:cursor-grabbing"
                                    style={{ touchAction: 'none' }}
                                >
                                    <div className="w-12 h-1 bg-slate-600 rounded-full" />
                                </div>
                            </div>

                            {/* Conteúdo com scroll */}
                            <div 
                                className="flex-1 overflow-y-auto px-6 pb-6"
                                style={{ 
                                    touchAction: 'pan-y',
                                    WebkitOverflowScrolling: 'touch' // Scroll suave no iOS
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}
            </div>
        </>
    );
}