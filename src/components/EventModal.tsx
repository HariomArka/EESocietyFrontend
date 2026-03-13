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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#060913] border border-white/10 rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-950/40 relative animate-modalSlide transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 text-gray-300 hover:text-white rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:rotate-90"
        >
          ✕
        </button>

        {/* Image Header */}
        <div className="h-72 overflow-hidden relative">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover animate-imageZoom"
          />
          {/* Gradient overlay fading into the dark card background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-[#060913]/30 to-transparent" />
        </div>

        {/* Content Body */}
        <div className="px-8 pb-8 -mt-6 animate-contentSlide">
          {/* Title sits right on top of the faded gradient */}
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
            {event.name}
          </h2>

          <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-5" />

          <p className="text-gray-400 text-base leading-relaxed mb-8 text-justify">
            {event.description}
          </p>

          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30"
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
