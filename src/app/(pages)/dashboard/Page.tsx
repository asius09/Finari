export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Balance Card */}
        <div className="p-6 rounded-lg bg-popover">
          <h3 className="text-sm text-muted-foreground">Total Balance</h3>
          <p className="text-2xl font-semibold text-primary">$12,345</p>
        </div>

        {/* Income Card */}
        <div className="p-6 rounded-lg bg-popover">
          <h3 className="text-sm text-muted-foreground">Income</h3>
          <p className="text-2xl font-semibold text-success">$5,000</p>
        </div>

        {/* Expenses Card */}
        <div className="p-6 rounded-lg bg-popover">
          <h3 className="text-sm text-muted-foreground">Expenses</h3>
          <p className="text-2xl font-semibold text-destructive">$2,500</p>
        </div>

        {/* Net Worth Card */}
        <div className="p-6 rounded-lg bg-popover">
          <h3 className="text-sm text-muted-foreground">Net Worth</h3>
          <p className="text-2xl font-semibold text-primary">$50,000</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="p-6 rounded-lg bg-popover">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Recent Transactions
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm">Groceries</p>
              <p className="text-sm text-destructive">-$50.00</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">Salary</p>
              <p className="text-sm text-success">+$2,500.00</p>
            </div>
          </div>
        </div>

        {/* Spending Breakdown */}
        <div className="p-6 rounded-lg bg-popover">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Spending Breakdown
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm">Food & Dining</p>
              <p className="text-sm">$300</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm">Transportation</p>
              <p className="text-sm">$150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
