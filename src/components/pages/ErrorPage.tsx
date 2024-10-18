import { useRouteError } from "react-router-dom";

interface RouteError {
  status?: number; // Optional status code
  statusText?: string; // Optional status text
  message: string; // The error message
}

export default function ErrorPage() {
  const error: RouteError = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
