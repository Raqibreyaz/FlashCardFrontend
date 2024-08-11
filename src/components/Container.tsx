import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  LoadingConditions: boolean[];
}

const Container = ({ children, LoadingConditions }: ContainerProps) => {
  const isLoading = LoadingConditions.includes(true);

  return !isLoading ? (
    <div>{children}</div>
  ) : (
    <h1 className="h-[100vh] w-full flex justify-center items-center">
      Loading...
    </h1>
  );
};

export default Container;
