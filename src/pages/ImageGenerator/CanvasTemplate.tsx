import { useEffect, useRef } from "react";

interface CanvasWithBgImageProps {
  bgImageFile: File;
  title: string;
  imageId: number;
}

const CanvasTemplate: React.FC<CanvasWithBgImageProps> = ({ bgImageFile, imageId, title }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const thema_img = new Image();
    img.src = URL.createObjectURL(bgImageFile);
    thema_img.src = `/src/assets/${imageId}.png`;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1600, 900);

      thema_img.onload = () => {
        // Rysowanie prostokąta z zaokrąglonymi rogami jako maska
        const x = 793;
        const y = 90;
        const width = 720;
        const height = 720;
        const cornerRadius = 30;

        // Funkcja rysująca prostokąt z zaokrąglonymi rogami
        function drawRoundedRect(
          ctx: CanvasRenderingContext2D,
          x: number,
          y: number,
          width: number,
          height: number,
          radius: number
        ) {
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
        }

        // Tworzymy maskę
        ctx.save();
        drawRoundedRect(ctx, x, y, width, height, cornerRadius);
        ctx.clip();

        // Rysujemy obraz wewnątrz zaokrąglonego prostokąta
        ctx.drawImage(thema_img, x, y, width, height);

        // Przywracamy kontekst do poprzedniego stanu
        ctx.restore();
      };

      // Dodajemy tytuł na środku kanwy
      ctx.font = "72px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "left";
      ctx.fillText(title, 70, 260);
    };

    return () => URL.revokeObjectURL(img.src);
  }, [bgImageFile, imageId, title]);

  return <canvas ref={canvasRef} width={1600} height={900} style={{ border: "1px solid black" }} />;
};

export default CanvasTemplate;
