import React, { useState, useEffect } from 'react';
import { Calculator, IndianRupee, Info, Building } from 'lucide-react';
import { AdUnit } from './AdUnit';

interface SalaryDetails {
  basicPay: number;
  da: number;
  hra: number;
  ta: number;
  daPercentage: number;
  npa?: number;
  otherAllowances: number;
  totalDeductions: number;
  netSalary: number;
  totalSalary: number;
}

function App() {
  const [level, setLevel] = useState('');
  const [basicPay, setBasicPay] = useState('');
  const [city, setCity] = useState('X');
  const [hasNPA, setHasNPA] = useState(false);
  const [otherAllowances, setOtherAllowances] = useState('0');
  const [deductions, setDeductions] = useState('0');
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetails | null>(null);

  const payLevels = {
    'Level 1': { min: 18000, max: 56900 },
    'Level 2': { min: 19900, max: 63200 },
    'Level 3': { min: 21700, max: 69100 },
    'Level 4': { min: 25500, max: 81100 },
    'Level 5': { min: 29200, max: 92300 },
    'Level 6': { min: 35400, max: 112400 },
    'Level 7': { min: 44900, max: 142400 },
    'Level 8': { min: 47600, max: 151100 },
    'Level 9': { min: 53100, max: 167800 },
    'Level 10': { min: 56100, max: 177500 },
    'Level 11': { min: 67700, max: 208700 },
    'Level 12': { min: 78800, max: 209200 },
    'Level 13': { min: 123100, max: 215900 },
    'Level 14': { min: 144200, max: 218200 },
  };

  const calculateSalary = () => {
    const basic = Number(basicPay);
    if (!basic || basic <= 0) return;

    // DA is currently 42% of basic pay (as of 2024)
    const daPercentage = 42;
    const da = basic * (daPercentage / 100);

    // HRA rates: X class - 24%, Y class - 16%, Z class - 8%
    const hraRates = { 'X': 0.24, 'Y': 0.16, 'Z': 0.08 };
    const hra = basic * hraRates[city as keyof typeof hraRates];

    // Transport Allowance
    const ta = 3600; // Fixed for most levels

    // NPA (Non-Practicing Allowance) for medical officers - 20% of basic pay
    const npa = hasNPA ? basic * 0.20 : 0;

    // Other allowances and deductions
    const otherAllowancesAmount = Number(otherAllowances) || 0;
    const totalDeductions = Number(deductions) || 0;

    const totalSalary = basic + da + hra + ta + npa + otherAllowancesAmount;
    const netSalary = totalSalary - totalDeductions;

    setSalaryDetails({
      basicPay: basic,
      da,
      hra,
      ta,
      daPercentage,
      npa,
      otherAllowances: otherAllowancesAmount,
      totalDeductions,
      netSalary,
      totalSalary
    });
  };

  useEffect(() => {
    calculateSalary();
  }, [basicPay, city, hasNPA, otherAllowances, deductions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">7th CPC Salary Calculator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your salary as per the 7th Central Pay Commission recommendations.
            Get accurate estimates of your Basic Pay, DA, HRA, and other allowances.
          </p>
        </header>

        <div className="flex gap-4">
          {/* Left Side Ad */}
          <div className="hidden lg:block w-64 space-y-4">
            <AdUnit slot="1234567890" />
            <AdUnit slot="0987654321" />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                  <Building className="w-6 h-6 text-indigo-600" />
                  Input Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pay Level
                    </label>
                    <select
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={level}
                      onChange={(e) => {
                        setLevel(e.target.value);
                        const selectedLevel = payLevels[e.target.value as keyof typeof payLevels];
                        if (selectedLevel) {
                          setBasicPay(selectedLevel.min.toString());
                        }
                      }}
                    >
                      <option value="">Select Pay Level</option>
                      {Object.keys(payLevels).map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Basic Pay
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={basicPay}
                      onChange={(e) => setBasicPay(e.target.value)}
                      placeholder="Enter Basic Pay"
                    />
                    {level && payLevels[level as keyof typeof payLevels] && (
                      <p className="text-sm text-gray-500 mt-1">
                        Range: ₹{payLevels[level as keyof typeof payLevels].min} - 
                        ₹{payLevels[level as keyof typeof payLevels].max}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City Classification
                    </label>
                    <select
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="X">X (Metro Cities)</option>
                      <option value="Y">Y (Large Cities)</option>
                      <option value="Z">Z (Other Cities)</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={hasNPA}
                        onChange={(e) => setHasNPA(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">Non-Practicing Allowance (NPA)</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Other Allowances
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={otherAllowances}
                      onChange={(e) => setOtherAllowances(e.target.value)}
                      placeholder="Enter other allowances"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Deductions
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={deductions}
                      onChange={(e) => setDeductions(e.target.value)}
                      placeholder="Enter monthly deductions"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                  <IndianRupee className="w-6 h-6 text-indigo-600" />
                  Salary Breakdown
                </h2>

                {salaryDetails && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-gray-600">Basic Pay:</div>
                      <div className="text-right font-semibold">₹{salaryDetails.basicPay.toFixed(2)}</div>
                      
                      <div className="text-gray-600">DA ({salaryDetails.daPercentage}%):</div>
                      <div className="text-right font-semibold">₹{salaryDetails.da.toFixed(2)}</div>
                      
                      <div className="text-gray-600">HRA:</div>
                      <div className="text-right font-semibold">₹{salaryDetails.hra.toFixed(2)}</div>
                      
                      <div className="text-gray-600">Transport Allowance:</div>
                      <div className="text-right font-semibold">₹{salaryDetails.ta.toFixed(2)}</div>

                      {hasNPA && (
                        <>
                          <div className="text-gray-600">NPA (20%):</div>
                          <div className="text-right font-semibold">₹{salaryDetails.npa?.toFixed(2)}</div>
                        </>
                      )}

                      {salaryDetails.otherAllowances > 0 && (
                        <>
                          <div className="text-gray-600">Other Allowances:</div>
                          <div className="text-right font-semibold">₹{salaryDetails.otherAllowances.toFixed(2)}</div>
                        </>
                      )}
                      
                      <div className="col-span-2 border-t pt-4 mt-2">
                        <div className="flex justify-between items-center text-lg font-bold text-green-700">
                          <span>Gross Salary:</span>
                          <span>₹{salaryDetails.totalSalary.toFixed(2)}</span>
                        </div>
                      </div>

                      {salaryDetails.totalDeductions > 0 && (
                        <>
                          <div className="text-gray-600">Total Deductions:</div>
                          <div className="text-right font-semibold text-red-600">
                            -₹{salaryDetails.totalDeductions.toFixed(2)}
                          </div>
                        </>
                      )}

                      <div className="col-span-2 border-t pt-4 mt-2">
                        <div className="flex justify-between items-center text-xl font-bold text-indigo-600">
                          <span>Net Salary:</span>
                          <span>₹{salaryDetails.netSalary.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 max-w-2xl mx-auto bg-blue-50 p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">Important Notes:</h3>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li>• DA rates are updated periodically by the government (Currently {salaryDetails?.daPercentage}%)</li>
                    <li>• HRA rates: X class cities (24%), Y class cities (16%), Z class cities (8%)</li>
                    <li>• Transport Allowance is fixed at ₹3,600 for most levels</li>
                    <li>• NPA is applicable only for medical officers (20% of basic pay)</li>
                    <li>• Additional allowances may apply based on your role and department</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Ad */}
          <div className="hidden lg:block w-64 space-y-4">
            <AdUnit slot="1111111111" />
            <AdUnit slot="2222222222" />
          </div>
        </div>

        {/* Bottom Ad Space - Visible on mobile */}
        <div className="lg:hidden mt-8">
          <AdUnit slot="3333333333" />
        </div>
      </div>
    </div>
  );
}

export default App;