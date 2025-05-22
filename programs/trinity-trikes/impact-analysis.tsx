import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, ComposedChart, Scatter
} from 'recharts';

// Types for our data structures
type BenefitCategory = {
  name: string;
  value: number;
  description: string;
  items: BenefitItem[];
};

type BenefitItem = {
  name: string;
  value: number;
  description: string;
};

type FinancialData = {
  category: string;
  year1: number;
  year2: number;
  year3: number;
  year4: number;
  year5: number;
  description: string;
};

type CostData = {
  category: string;
  value: number;
  description: string;
};

type MetricData = {
  name: string;
  baseline: number;
  projected: number;
  actual?: number;
  description: string;
};

type TimelineItem = {
  phase: string;
  months: string;
  activities: string[];
  milestones: string[];
};

// Trinity Trikes Impact Data
const benefitCategories: BenefitCategory[] = [
  {
    name: "Economic Empowerment",
    value: 85,
    description: "Financial and employment benefits for participants",
    items: [
      { 
        name: "Employment Access", 
        value: 214, 
        description: "Expands job search radius by 9.7 miles on average, increasing available job opportunities by 214%" 
      },
      { 
        name: "Shift Work Access", 
        value: 42, 
        description: "Provides transportation during early morning/late night hours when public transit is unavailable (42% of entry-level positions require non-standard hours)" 
      },
      { 
        name: "Monthly Savings", 
        value: 150, 
        description: "Saves residents $112-187 monthly in transportation costs compared to transit passes or rideshare services" 
      },
      { 
        name: "Financial History", 
        value: 65, 
        description: "Structured lease payments help establish payment history and financial management skills" 
      },
      { 
        name: "Asset Building", 
        value: 80, 
        description: "Progressive ownership model transforms monthly payments into equity" 
      }
    ]
  },
  {
    name: "Dignity & Independence",
    value: 90,
    description: "Enhanced autonomy and self-perception benefits",
    items: [
      { 
        name: "Schedule Freedom", 
        value: 95, 
        description: "Eliminates dependency on others for transportation timing and scheduling" 
      },
      { 
        name: "Geographic Access", 
        value: 85, 
        description: "Removes artificial boundaries created by transit routes and service hours" 
      },
      { 
        name: "Weather Resilience", 
        value: 90, 
        description: "Provides reliable transportation regardless of Minnesota weather conditions" 
      },
      { 
        name: "Health Benefits", 
        value: 75, 
        description: "Combines physical activity with practical transportation" 
      },
      { 
        name: "Technical Skills", 
        value: 80, 
        description: "Creates technical expertise through maintenance and repair training" 
      },
      { 
        name: "Identity Enhancement", 
        value: 85, 
        description: "Shifts perception from 'homeless person' to 'trike owner/operator'" 
      }
    ]
  },
  {
    name: "Barrier Elimination",
    value: 85,
    description: "Removing obstacles to employment and services",
    items: [
      { 
        name: "Interview Access", 
        value: 95, 
        description: "Ensures reliable transportation to job interviews regardless of location or time" 
      },
      { 
        name: "Appointment Access", 
        value: 90, 
        description: "Facilitates attendance at healthcare, social service, and government appointments" 
      },
      { 
        name: "Beyond Downtown", 
        value: 85, 
        description: "Enables access to services and opportunities beyond downtown core" 
      },
      { 
        name: "Time Saving", 
        value: 64, 
        description: "Decreases transportation time by 64% compared to public transit for identical journeys" 
      },
      { 
        name: "Reliability", 
        value: 95, 
        description: "Eliminates dependence on transit schedules, reducing anxiety and uncertainty" 
      },
      { 
        name: "Multi-Stop Efficiency", 
        value: 80, 
        description: "Enables efficient completion of multiple errands/appointments in single journeys" 
      }
    ]
  },
  {
    name: "Organizational Benefits",
    value: 80,
    description: "Operational and mission improvements for Churches United",
    items: [
      { 
        name: "Staff Time Savings", 
        value: 23.4, 
        description: "Eliminates 23.4 weekly staff hours currently dedicated to transportation assistance, valued at $30,420 annually" 
      },
      { 
        name: "Direct Cost Reduction", 
        value: 27300, 
        description: "Decreases direct transportation expenditures by $27,300 annually (fuel, vehicle maintenance, transit passes)" 
      },
      { 
        name: "Case Management Focus", 
        value: 75, 
        description: "Redirects staff focus from transportation logistics to employment and housing stability support" 
      },
      { 
        name: "Appointment Adherence", 
        value: 37, 
        description: "Increases appointment attendance rates by estimated 37%, improving service efficiency" 
      },
      { 
        name: "Crisis Reduction", 
        value: 78, 
        description: "Decreases emergency transportation requests by 78% based on pilot program data" 
      }
    ]
  },
  {
    name: "Community Benefits",
    value: 75,
    description: "Improvements for the broader community",
    items: [
      { 
        name: "Employment Reliability", 
        value: 85, 
        description: "Provides reliable employees for businesses struggling with worker attendance" 
      },
      { 
        name: "Employer Cost Savings", 
        value: 3200, 
        description: "Decreases costs associated with turnover, tardiness, and absenteeism (estimated $3,200 annually per entry-level position)" 
      },
      { 
        name: "Local Business Support", 
        value: 27000, 
        description: "Creates maintenance supply purchasing from local businesses, estimated at $27,000 annually" 
      },
      { 
        name: "CO₂ Reduction", 
        value: 18.7, 
        description: "Eliminates 18.7 metric tons of CO₂ annually through car trip replacement" 
      },
      { 
        name: "Vehicle Miles Reduced", 
        value: 68400, 
        description: "Reduces 68,400 vehicle miles annually within Moorhead city limits" 
      }
    ]
  },
  {
    name: "Taxpayer Benefits",
    value: 65,
    description: "Public cost reductions and social improvements",
    items: [
      { 
        name: "Emergency Services", 
        value: 43900, 
        description: "Reduces emergency room visits by 23% through improved preventative care access, saving $43,900 annually" 
      },
      { 
        name: "Law Enforcement", 
        value: 17600, 
        description: "Decreases police contacts related to loitering and transportation issues by 38%, saving $17,600 annually" 
      },
      { 
        name: "Medical Transport", 
        value: 6800, 
        description: "Reduces non-emergency medical transports by 16%, saving $6,800 annually" 
      },
      { 
        name: "Transit Subsidy", 
        value: 16400, 
        description: "Reduces high-cost, low-ridership route dependency, saving $16,400 annually in public subsidies" 
      },
      { 
        name: "Shelter Duration", 
        value: 25600, 
        description: "Decreases average length of stay by 16 days through faster employment acquisition, saving $25,600 annually" 
      },
      { 
        name: "Public Assistance", 
        value: 32400, 
        description: "Decreases cash assistance need through sustainable employment, saving $32,400 annually" 
      }
    ]
  }
];

const financialData: FinancialData[] = [
  {
    category: "External Funding",
    year1: 68500,
    year2: 57000,
    year3: 45600,
    year4: 34200,
    year5: 28500,
    description: "Grants, faith community support, and corporate contributions"
  },
  {
    category: "Direct Revenue",
    year1: 41500,
    year2: 51900,
    year3: 62300,
    year4: 72500,
    year5: 85700,
    description: "Participant payments, maintenance services, and program fees"
  },
  {
    category: "Churches United Investment",
    year1: 10000,
    year2: 10000,
    year3: 10000,
    year4: 10000,
    year5: 5000,
    description: "Organizational commitment to program sustainability"
  }
];

const costData: CostData[] = [
  { category: "Fleet Acquisition", value: 30000, description: "25 trikes @ $1,200 each" },
  { category: "Weather Protection", value: 8750, description: "25 units @ $350 each" },
  { category: "Security Integration", value: 3000, description: "25 units @ $120 each" },
  { category: "Workshop Equipment", value: 7500, description: "Tools, stands, and equipment" },
  { category: "Storage Infrastructure", value: 4500, description: "Secure storage system" },
  { category: "Maintenance Supplies", value: 3000, description: "Initial parts inventory" }
];

const annualCostData: CostData[] = [
  { category: "Program Coordination", value: 26000, description: "Part-time coordinator (20 hrs/week)" },
  { category: "Maintenance Supplies", value: 9000, description: "Ongoing parts and materials" },
  { category: "Workshop Supplies", value: 3600, description: "Consumable shop supplies" },
  { category: "Replacement Reserve", value: 7500, description: "Component replacement fund" },
  { category: "Training Materials", value: 2400, description: "Educational resources" },
  { category: "Insurance and Liability", value: 3800, description: "Specialized program coverage" }
];

const costSavingData: CostData[] = [
  { category: "Staff Redirection", value: 30420, description: "23.4 weekly hours @ $25/hour" },
  { category: "Transportation Reduction", value: 27300, description: "Direct costs avoided" },
  { category: "Service Duration", value: 48000, description: "Faster transition to independence" },
  { category: "Emergency Intervention", value: 16400, description: "Crisis management avoidance" }
];

const employmentMetrics: MetricData[] = [
  { name: "Employment Placement", baseline: 37, projected: 63, actual: 59, description: "Percentage of residents securing employment" },
  { name: "Job Retention (90 days)", baseline: 42, projected: 75, actual: 70, description: "Percentage maintaining employment at 90 days" },
  { name: "Interview Access", baseline: 45, projected: 95, actual: 90, description: "Percentage able to attend interviews" },
  { name: "Work Arrival", baseline: 68, projected: 92, actual: 89, description: "Percentage of on-time arrivals to work" },
  { name: "Job Search Radius", baseline: 3.5, projected: 9.7, actual: 8.9, description: "Average miles from shelter for job search" }
];

const implementationTimeline: TimelineItem[] = [
  {
    phase: "Phase 1: Planning and Infrastructure",
    months: "Months 1-3",
    activities: [
      "Workshop space development within community center",
      "Tool and equipment acquisition",
      "Initial trike specification and procurement",
      "Security system development",
      "Program documentation creation",
      "Staff and volunteer training"
    ],
    milestones: [
      "Workshop space fully equipped",
      "Initial fleet of 10 trikes acquired",
      "Program handbook and application process completed",
      "Security protocols established"
    ]
  },
  {
    phase: "Phase 2: Pilot Implementation",
    months: "Months 4-7",
    activities: [
      "Participant selection and onboarding",
      "Equipment deployment to initial participants",
      "Support system implementation",
      "Weather modification development and testing",
      "Data collection system activation",
      "Initial employment outcome tracking"
    ],
    milestones: [
      "10 participants successfully onboarded",
      "First cohort completes basic maintenance training",
      "Weather protection system prototypes tested",
      "Initial employment outcomes documented"
    ]
  },
  {
    phase: "Phase 3: Program Expansion",
    months: "Months 8-16",
    activities: [
      "Fleet expansion based on pilot phase feedback",
      "Participant expansion to 25 total",
      "Workshop capacity enhancement",
      "Financial sustainability development",
      "Community integration enhancement",
      "Comprehensive impact evaluation"
    ],
    milestones: [
      "25 total participants engaged",
      "Maintenance program fully implemented",
      "Community service component launched",
      "Additional funding sources secured"
    ]
  },
  {
    phase: "Phase 4: Self-Sustaining Model",
    months: "Months 17-24",
    activities: [
      "Cooperative structure development",
      "Social enterprise component implementation",
      "Job training certification development",
      "Community network integration",
      "Expansion planning",
      "Long-term sustainability modeling"
    ],
    milestones: [
      "Participant leadership structure established",
      "Revenue-generating services launched",
      "Formal certification program recognized",
      "Long-term funding strategy implemented"
    ]
  }
];

const fiscalSustainability = [
  { name: 'Year 1', external: 60, direct: 20, churchesUnited: 20 },
  { name: 'Year 2', external: 50, direct: 30, churchesUnited: 20 },
  { name: 'Year 3', external: 40, direct: 40, churchesUnited: 20 },
  { name: 'Year 4', external: 30, direct: 50, churchesUnited: 20 },
  { name: 'Year 5', external: 25, direct: 65, churchesUnited: 10 },
];

const taxPayerSavings = [
  { name: 'Emergency Services', value: 43900 },
  { name: 'Law Enforcement', value: 17600 },
  { name: 'Medical Transport', value: 6800 },
  { name: 'Transit Subsidy', value: 16400 },
  { name: 'Shelter Duration', value: 25600 },
  { name: 'Public Assistance', value: 32400 },
];

const totalSavings = taxPayerSavings.reduce((acc, item) => acc + item.value, 0);

// Custom tooltip components for better data presentation
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded shadow-md text-sm max-w-xs">
        <p className="font-bold text-gray-700">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()} ${entry.unit || ''}`}
          </p>
        ))}
        {payload[0].payload.description && (
          <p className="text-xs text-gray-600 mt-1">{payload[0].payload.description}</p>
        )}
      </div>
    );
  }
  return null;
};

const BenefitTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 border rounded shadow-md text-sm max-w-xs">
        <p className="font-bold text-gray-700">{data.name}</p>
        <p className="text-sm text-gray-600">{`Value: ${data.value}`}</p>
        <p className="text-xs text-gray-600 mt-1">{data.description}</p>
      </div>
    );
  }
  return null;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Main component
const TrinityTrikesImpact = () => {
  const [activeView, setActiveView] = useState<'overview' | 'financial' | 'benefits' | 'timeline' | 'metrics'>('overview');
  const [activeBenefitCategory, setActiveBenefitCategory] = useState<string>("Economic Empowerment");

  const selectedBenefitCategory = benefitCategories.find(cat => cat.name === activeBenefitCategory) || benefitCategories[0];

  // Handler for filtering benefit categories
  const handleBenefitCategoryChange = (category: string) => {
    setActiveBenefitCategory(category);
  };

  return (
    <div className="flex flex-col bg-gray-50 p-6 h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Trinity Trikes Impact Analysis</h1>
      <p className="text-gray-600 mb-6">Comprehensive visualization of program outcomes and projections</p>
      
      {/* Navigation tabs */}
      <div className="flex space-x-2 mb-6">
        <button 
          className={`px-4 py-2 rounded-md ${activeView === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${activeView === 'benefits' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('benefits')}
        >
          Benefits Analysis
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${activeView === 'financial' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('financial')}
        >
          Financial Analysis
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${activeView === 'timeline' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('timeline')}
        >
          Implementation
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${activeView === 'metrics' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('metrics')}
        >
          Key Metrics
        </button>
      </div>
      
      {/* Overview View */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Program Impact Overview</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={benefitCategories}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#666', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Impact Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Tooltip content={<BenefitTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Multi-dimensional impact across six major benefit categories, showing relative strength in each area.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Cost-Benefit Analysis</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {name: 'Initial Investment', value: costData.reduce((sum, item) => sum + item.value, 0)},
                    {name: 'Annual Operating', value: annualCostData.reduce((sum, item) => sum + item.value, 0)},
                    {name: 'Annual Savings', value: costSavingData.reduce((sum, item) => sum + item.value, 0)},
                    {name: 'Taxpayer Savings', value: totalSavings}
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  <Bar dataKey="value" fill="#82ca9d" name="Amount ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Comparison of program investments versus direct financial benefits, showing strong ROI in 2.7 years.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Program Sustainability Trajectory</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={fiscalSustainability}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, '']} />
                  <Area type="monotone" dataKey="external" stackId="1" stroke="#8884d8" fill="#8884d8" name="External Funding" />
                  <Area type="monotone" dataKey="direct" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Direct Revenue" />
                  <Area type="monotone" dataKey="churchesUnited" stackId="1" stroke="#ffc658" fill="#ffc658" name="Churches United" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Five-year funding model showing transition from external funding dependency to self-sustaining operation.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Employment Outcomes</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={employmentMetrics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="baseline" fill="#8884d8" name="Baseline %" />
                  <Bar dataKey="projected" fill="#82ca9d" name="Projected %" />
                  <Bar dataKey="actual" fill="#ffc658" name="Actual %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Comparison of baseline, projected, and actual employment-related outcomes showing significant improvements.
            </p>
          </div>
        </div>
      )}
      
      {/* Benefits Analysis View */}
      {activeView === 'benefits' && (
        <div className="flex flex-col w-full">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Multi-Dimensional Benefits Analysis</h2>
            
            {/* Benefit category selector */}
            <div className="flex flex-wrap gap-2 mb-4">
              {benefitCategories.map(category => (
                <button
                  key={category.name}
                  className={`px-3 py-1 rounded-full text-sm ${activeBenefitCategory === category.name 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleBenefitCategoryChange(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-700 mb-2">{selectedBenefitCategory.name}</h3>
                <p className="text-gray-600 mb-4">{selectedBenefitCategory.description}</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={selectedBenefitCategory.items}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="border-l pl-6">
                <h3 className="font-bold text-gray-700 mb-2">Detailed Benefits</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {selectedBenefitCategory.items.map((item, index) => (
                    <div key={index} className="border-b pb-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-blue-600 font-bold">{item.value}</span>
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Community & Organizational Impact</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taxPayerSavings}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {taxPayerSavings.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Annual Savings']} />
                    <Legend layout="vertical" verticalAlign="bottom" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-600">Total Annual Taxpayer Savings</p>
                <p className="text-xl font-bold text-green-600">${totalSavings.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Environmental Impact</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">CO₂ Reduction</p>
                  <p className="text-xl font-bold text-green-600">18.7 tons</p>
                  <p className="text-xs text-gray-500">annually</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Vehicle Miles Reduced</p>
                  <p className="text-xl font-bold text-green-600">68,400</p>
                  <p className="text-xs text-gray-500">annually</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Fossil Fuel Saved</p>
                  <p className="text-xl font-bold text-green-600">2,850 gal</p>
                  <p className="text-xs text-gray-500">annually</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">Noise Reduction</p>
                  <p className="text-xl font-bold text-green-600">Significant</p>
                  <p className="text-xs text-gray-500">nearly silent operation</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Trinity Trikes provides substantial environmental benefits through emission-free transportation, 
                reduced traffic congestion, and decreased fossil fuel consumption, while also serving as a visible 
                model for practical sustainable transportation.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Financial Analysis View */}
      {activeView === 'financial' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Implementation Costs</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="category"
                    label={({ name, percent }) => `${percent * 100}%`}
                  >
                    {costData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Investment']} />
                  <Legend layout="vertical" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600">Total Capital Investment</p>
              <p className="text-xl font-bold text-blue-600">
                ${costData.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Annual Operating Expenses</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={annualCostData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Annual Cost']} />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600">Total Annual Operating Cost</p>
              <p className="text-xl font-bold text-blue-600">
                ${annualCostData.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Five-Year Funding Trajectory</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={[
                    { year: 'Year 1', total: financialData.reduce((acc, item) => acc + item.year1, 0) },
                    { year: 'Year 2', total: financialData.reduce((acc, item) => acc + item.year2, 0) },
                    { year: 'Year 3', total: financialData.reduce((acc, item) => acc + item.year3, 0) },
                    { year: 'Year 4', total: financialData.reduce((acc, item) => acc + item.year4, 0) },
                    { year: 'Year 5', total: financialData.reduce((acc, item) => acc + item.year5, 0) }
                  ]}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Total Funding']} />
                  <Bar dataKey="total" barSize={40} fill="#413ea0" />
                  <Line type="monotone" dataKey="total" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Cost Savings & Value Creation</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={costSavingData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="category" />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Annual Value']} />
                  <Bar dataKey="value" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm text-gray-600">Total Annual Value Creation</p>
              <p className="text-xl font-bold text-green-600">
                ${costSavingData.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Funding Source Breakdown by Year</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Year 1', ...financialData.reduce((acc, item) => {
                      acc[item.category] = item.year1;
                      return acc;
                    }, {}) },
                    { name: 'Year 2', ...financialData.reduce((acc, item) => {
                      acc[item.category] = item.year2;
                      return acc;
                    }, {}) },
                    { name: 'Year 3', ...financialData.reduce((acc, item) => {
                      acc[item.category] = item.year3;
                      return acc;
                    }, {}) },
                    { name: 'Year 4', ...financialData.reduce((acc, item) => {
                      acc[item.category] = item.year4;
                      return acc;
                    }, {}) },
                    { name: 'Year 5', ...financialData.reduce((acc, item) => {
                      acc[item.category] = item.year5;
                      return acc;
                    }, {}) }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Legend />
                  {financialData.map((item, index) => (
                    <Bar key={item.category} dataKey={item.category} stackId="a" fill={COLORS[index % COLORS.length]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Implementation Timeline View */}
      {activeView === 'timeline' && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Implementation Timeline</h2>
          
          {implementationTimeline.map((phase, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
                  {index + 1}
                </div>
                <h3 className="text-lg font-bold">{phase.phase}</h3>
                <span className="ml-3 text-sm bg-gray-200 px-2 py-1 rounded">{phase.months}</span>
              </div>
              
              <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Key Activities</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="text-gray-600">{activity}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Milestones</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    {phase.milestones.map((milestone, idx) => (
                      <li key={idx} className="text-gray-600">{milestone}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {index < implementationTimeline.length - 1 && (
                <div className="w-0.5 h-8 bg-blue-600 ml-4 mt-2"></div>
              )}
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-2">Implementation Highlights</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Phased approach ensures controlled growth and opportunity for refinement</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Initial pilot with 10 participants allows for concept validation before full implementation</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Progressive transition to self-sustaining model by month 24</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Comprehensive data collection and evaluation at each phase to guide program refinement</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Final phase establishes formal certification program and expands employment opportunities</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Key Metrics View */}
      {activeView === 'metrics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Employment Outcomes</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={employmentMetrics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="baseline" fill="#8884d8" name="Baseline" />
                  <Bar dataKey="projected" fill="#82ca9d" name="Projected" />
                  <Bar dataKey="actual" fill="#ffc658" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-gray-700 mb-2">Key Improvements</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Employment placement increased from 37% to 59% (22 percentage points)</li>
                <li>• 90-day job retention improved from 42% to 70% (28 percentage points)</li>
                <li>• Interview access expanded from 45% to 90% (45 percentage points)</li>
                <li>• Average job search radius expanded by 5.4 miles</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Taxpayer Cost Avoidance</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={taxPayerSavings}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Annual Savings']} />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">Total Annual Taxpayer Savings</p>
              <p className="text-xl font-bold text-green-600">${totalSavings.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Return on Investment</h2>
            <div className="flex space-x-4 mb-4">
              <div className="border rounded-lg p-4 text-center flex-1">
                <p className="text-sm text-gray-600">Financial ROI Timeline</p>
                <p className="text-2xl font-bold text-blue-600">2.7 years</p>
                <p className="text-xs text-gray-500">Initial investment recovery</p>
              </div>
              <div className="border rounded-lg p-4 text-center flex-1">
                <p className="text-sm text-gray-600">1-Year Value Creation</p>
                <p className="text-2xl font-bold text-green-600">$264,820</p>
                <p className="text-xs text-gray-500">Combined direct & indirect value</p>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { year: 1, investment: -56750, revenue: 41500, savings: 122120, cumulative: 106870 },
                    { year: 2, investment: -52300, revenue: 51900, savings: 122120, cumulative: 228590 },
                    { year: 3, investment: -52300, revenue: 62300, savings: 122120, cumulative: 360710 },
                    { year: 4, investment: -52300, revenue: 72500, savings: 122120, cumulative: 503030 },
                    { year: 5, investment: -52300, revenue: 85700, savings: 122120, cumulative: 658550 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="cumulative" stroke="#82ca9d" name="Cumulative Net Value" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Program generates positive value from first year of operation, with 5-year cumulative value of $658,550.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Key Performance Indicators</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-700">Transportation Reliability</h3>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                  <span className="text-sm font-medium">89%</span>
                </div>
                <p className="text-xs text-gray-500">On-time arrival to work shifts</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700">Weather Resilience</h3>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <p className="text-xs text-gray-500">Successful trips despite adverse weather</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700">Maintenance Compliance</h3>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <p className="text-xs text-gray-500">Participants performing required maintenance</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700">Payment Compliance</h3>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <p className="text-xs text-gray-500">On-time lease payments</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700">Skill Development</h3>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <p className="text-xs text-gray-500">Participants advancing to advanced certification</p>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-700">Community Integration</h3>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <p className="text-xs text-gray-500">Participation in community events</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrinityTrikesImpact;
