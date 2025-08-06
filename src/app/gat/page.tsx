export default function GAT() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">GAT Dashboard</h1>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Global Assessment Tool</h2>
          <p className="text-gray-600 mb-4">
            This is the GAT (Global Assessment Tool) section of the World Bank dashboard.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Assessment Metrics</h3>
              <p className="text-sm text-gray-600">Track and analyze global development metrics and indicators.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Data Visualization</h3>
              <p className="text-sm text-gray-600">Interactive charts and graphs for comprehensive data analysis.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}