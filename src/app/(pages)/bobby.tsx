export default function BobbyPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Random Thin Content</h1>
      <div className="space-y-4">
        <div className="p-4 bg-background/50 backdrop-blur-sm rounded-lg">
          <p className="text-sm text-muted-foreground">
            Did you know? The average cloud weighs about 1.1 million pounds.
          </p>
        </div>
        <div className="p-4 bg-background/50 backdrop-blur-sm rounded-lg">
          <p className="text-sm text-muted-foreground">
            A single strand of spaghetti is called a "spaghetto".
          </p>
        </div>
        <div className="p-4 bg-background/50 backdrop-blur-sm rounded-lg">
          <p className="text-sm text-muted-foreground">
            Bananas are berries, but strawberries aren't.
          </p>
        </div>
        <div className="p-4 bg-background/50 backdrop-blur-sm rounded-lg">
          <p className="text-sm text-muted-foreground">
            Octopuses have three hearts and blue blood.
          </p>
        </div>
      </div>
    </div>
  );
}
