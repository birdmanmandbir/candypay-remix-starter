import { Button } from "~/components/ui/button";

export default function Success() {
  return (
    <div className="flex justify-center items-center h-full flex-col gap-4">
      <h1>
        Your payment is successful!
      </h1>
      <Button>
        <a href="/">
          Return to Main Page
        </a>
      </Button>
    </div>
  );
}
