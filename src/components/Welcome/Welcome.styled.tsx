import type { ReactNode } from 'react';

interface ChildrenProps {
  children: ReactNode;
}

export function DashboardContainer({ children }: ChildrenProps) {
  return <main className="w-full relative">{children}</main>;
}

export function DashboardWrapper({ children }: ChildrenProps) {
  return <div className="w-full flex">{children}</div>;
}

export function MainDashboardSection({ children }: ChildrenProps) {
  return <div className="w-full relative bg-white h-[400px]">{children}</div>;
}

export function TitleSection({ children }: ChildrenProps) {
  return <div className="absolute left-[318px] top-20">{children}</div>;
}

export function DashboardTitle({ children }: ChildrenProps) {
  return (
    <h1 className="font-semibold text-[40px] leading-[48px] text-[#295e84] tracking-[-0.64px]">
      {children}
    </h1>
  );
}

export function DescriptionSection({ children }: ChildrenProps) {
  return (
    <div className="absolute left-[318px] top-36 w-[497px]">{children}</div>
  );
}

export function DescriptionParagraph({ children }: ChildrenProps) {
  return (
    <p className="font-normal text-[14px] leading-[24px] text-[#295e84] mb-3.5">
      {children}
    </p>
  );
}

export function DescriptionParagraphLast({ children }: ChildrenProps) {
  return (
    <p className="font-normal text-[14px] leading-[24px] text-[#295e84]">
      {children}
    </p>
  );
}

export function ItalicText({ children }: ChildrenProps) {
  return <span className="font-normal italic">{children}</span>;
}

export function MapVisualizationSection({ children }: ChildrenProps) {
  return (
    <div className="absolute h-[304px] left-[756px] top-0 w-[684px] overflow-hidden">
      {children}
    </div>
  );
}

export function BackgroundMapContainer() {
  return (
    <div
      className="absolute h-[450px] left-[30px] top-[-55px] w-[727px] bg-center bg-cover bg-no-repeat opacity-[0.08]"
      style={{
        backgroundImage: "url('/world-map-dashboard.png')",
      }}
    />
  );
}

export function MainMapContainer() {
  return (
    <div
      className="absolute h-[276px] left-[97px] top-[38px] w-[447px] bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/world-map-dashboard.png')",
      }}
    />
  );
}
