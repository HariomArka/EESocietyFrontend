import React from 'react';

interface EventModalProps {
  isOpen: boolean;
  event: {
    id: number;
    name: string;
    description: string;
    image: string;
  } | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, event, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-modalSlide transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-2xl transition-all duration-300 hover:rotate-90"
        >
          ✕
        </button>

        {/* Image Header */}
        <div className="h-80 overflow-hidden relative">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover animate-imageZoom"
          />
        </div>

        {/* Content Body */}
        <div className="p-10 animate-contentSlide">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 tracking-tight">
            {event.name}
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-8 text-justify">
            {event.description}
          </p>

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes imageZoom {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes contentSlide {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-modalSlide {
          animation: modalSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-imageZoom {
          animation: imageZoom 0.6s ease-out;
        }

        .animate-contentSlide {
          animation: contentSlide 0.5s ease-out 0.1s both;
        }
      `}</style>
    </div>
  );
};

export default EventModal;
