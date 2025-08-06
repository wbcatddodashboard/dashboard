'use client';

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1 className="text-6xl font-bold text-center text-gray-900">
              World Bank Dashboard
            </h1>
            <p className="text-xl text-center text-gray-600 mt-4">
              Explore global development projects and data
            </p>
          </div>
        </header>
        <nav className="flex flex-1 flex-col justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-8">
              Welcome to the World Bank project dashboard. Use the sidebar to filter projects by status, region, and country.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Status</h3>
                <p className="text-gray-600">Filter projects by their current status: Dropped, Pipeline, and more.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Regional Data</h3>
                <p className="text-gray-600">Explore projects across different World Bank regions like AFE, AFW, EAP, and others.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Country Analysis</h3>
                <p className="text-gray-600">Dive deep into country-specific projects and development initiatives.</p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </main>
  );
}