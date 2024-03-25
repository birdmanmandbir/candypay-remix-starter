import { Button } from "~/components/ui/button";

export default function Cancel() {
  return (
    <div className="flex justify-center items-center h-full flex-col gap-4">
      <h1>
        Forgot to add something to your cart? Shop around then come back to pay!
      </h1>
      <Button>
        <a href="/">
          Return to Main Page
        </a>
      </Button>
    </div>
  );
}
