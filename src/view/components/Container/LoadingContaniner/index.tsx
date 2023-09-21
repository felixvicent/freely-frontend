import { Spin } from "antd";
import { ReactNode } from "react";

interface LoadingContainerProps {
  isLoading: boolean;
  children: ReactNode;
}

export function LoadingContainer({
  isLoading,
  children,
}: LoadingContainerProps) {
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return children;
}
