import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showNavigation?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-[95vw] max-h-[95vh]'
};

export default function Lightbox({
  isOpen,
  onClose,
  children,
  title,
  size = 'lg',
  showCloseButton = true,
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  header,
  footer,
  showNavigation = false,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false
}: LightboxProps) {
  
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    const handleKeyNavigation = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      }
      if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };

    document.addEventListener('keydown', handleEscape);
    if (showNavigation) {
      document.addEventListener('keydown', handleKeyNavigation);
    }

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleKeyNavigation);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose, showNavigation, hasPrevious, hasNext, onPrevious, onNext]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      {showBackdrop && (
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleBackdropClick}
        />
      )}
      
      {/* Lightbox Content */}
      <div 
        className={cn(
          'relative bg-white rounded-lg shadow-2xl w-full mx-4 my-4 overflow-hidden',
          'transform transition-all duration-300 ease-out',
          'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || header || showCloseButton || showNavigation) && (
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center space-x-4">
              {showNavigation && hasPrevious && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onPrevious}
                  className="p-2 hover:bg-gray-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              )}
              
              <div className="flex-1">
                {header || (title && (
                  <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {showNavigation && hasNext && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNext}
                  className="p-2 hover:bg-gray-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
              
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(100vh-8rem)]">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Lightbox Provider for managing multiple lightboxes
interface LightboxContextType {
  openLightbox: (id: string, props: Omit<LightboxProps, 'isOpen' | 'onClose'>) => void;
  closeLightbox: (id: string) => void;
  closeAllLightboxes: () => void;
  isLightboxOpen: (id: string) => boolean;
}

const LightboxContext = React.createContext<LightboxContextType | undefined>(undefined);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [lightboxes, setLightboxes] = React.useState<Record<string, Omit<LightboxProps, 'isOpen' | 'onClose'>>>({});

  const openLightbox = (id: string, props: Omit<LightboxProps, 'isOpen' | 'onClose'>) => {
    setLightboxes(prev => ({ ...prev, [id]: props }));
  };

  const closeLightbox = (id: string) => {
    setLightboxes(prev => {
      const { [id]: removed, ...rest } = prev;
      return rest;
    });
  };

  const closeAllLightboxes = () => {
    setLightboxes({});
  };

  const isLightboxOpen = (id: string) => {
    return id in lightboxes;
  };

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox, closeAllLightboxes, isLightboxOpen }}>
      {children}
      {Object.entries(lightboxes).map(([id, props]) => (
        <Lightbox
          key={id}
          isOpen={true}
          onClose={() => closeLightbox(id)}
          {...props}
        />
      ))}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const context = React.useContext(LightboxContext);
  if (context === undefined) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
}
