import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, ComposedChart
} from 'recharts';

// Define TypeScript interfaces
interface BenefitItem {
  name: string;
  value: number;
  description: string;
}

interface BenefitCategory {
  name: string;
  value: number;
  description: string;
  items: BenefitItem[];
}

interface FinancialData {
  category: string;
  year1: number;
  year2: number;
  year3: number;
  year4: number;
  year5: number;
  description: string;
}

interface TimelineItem {
  phase: string;
  months: string;
  activities: string[];
  milestones: string[];
}

interface DataObject {
  [key: string]: number | string;
}

// Sample data for the visualization
const benefitCategories: BenefitCategory[] = [
  {
    name: "Economic Empowerment",
    value: 85,
    description: "Financial and employment benefits for participants",
    items: [
      { name: "Employment Access", value: 214, description: "Expands job search radius by 9.7 miles" },
      { name: "Shift Work Access", value: 42, description: "Provides transportation during non-standard hours" },
      { name: "Monthly Savings", value: 150, description: "Saves residents $112-187 monthly" }
    ]
  },
  {
    name: "Dignity & Independence",
    value: 90,
    description: "Enhanced autonomy and self-perception benefits",
    items: [
      { name: "Schedule Freedom", value: 95, description: "Eliminates dependency on others" },
      { name: "Geographic Access", value: 85, description: "Removes artificial boundaries" }
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
  }
];

const implementationTimeline: TimelineItem[] = [
  {
    phase: "Phase 1: Planning and Infrastructure",
    months: "Months 1-3",
    activities: ["Workshop space development", "Tool and equipment acquisition"],
    milestones: ["Workshop space fully equipped", "Initial fleet of 10 trikes acquired"]
  },
  {
    phase: "Phase 2: Pilot Implementation",
    months: "Months 4-7",
    activities: ["Participant selection and onboarding", "Equipment deployment"],
    milestones: ["10 participants successfully onboarded", "First cohort completes training"]
  }
];

// Color palette
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Main component
const ImpactAnalysis: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'financial' | 'benefits' | 'timeline'>('overview');

  return (
    <div className="impact-analysis p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Trinity Trikes Impact Analysis</h1>
      
      {/* Navigation */}
      <div className="flex mb-6 space-x-2">
        <button 
          className={`px-4 py-2 rounded ${activeView === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeView === 'benefits' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('benefits')}
        >
          Benefits
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeView === 'financial' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('financial')}
        >
          Financial
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeView === 'timeline' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveView('timeline')}
        >
          Timeline
        </button>
      </div>
      
      {/* Overview View */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Program Impact Overview</h2>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <RadarChart outerRadius={90} data={benefitCategories}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <Radar name="Impact Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Financial Sustainability</h2>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={[
                    { name: 'Year 1', external: 60, direct: 20, churchesUnited: 20 },
                    { name: 'Year 2', external: 50, direct: 30, churchesUnited: 20 },
                    { name: 'Year 3', external: 40, direct: 40, churchesUnited: 20 },
                    { name: 'Year 4', external: 30, direct: 50, churchesUnited: 20 },
                    { name: 'Year 5', external: 25, direct: 65, churchesUnited: 10 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="external" stackId="1" stroke="#8884d8" fill="#8884d8" name="External Funding" />
                  <Area type="monotone" dataKey="direct" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Direct Revenue" />
                  <Area type="monotone" dataKey="churchesUnited" stackId="1" stroke="#ffc658" fill="#ffc658" name="Churches United" />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* Financial View */}
      {activeView === 'financial' && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Financial Projection</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart
                data={financialData.map(item => ({
                  category: item.category,
                  Year1: item.year1,
                  Year2: item.year2,
                  Year3: item.year3,
                  Year4: item.year4,
                  Year5: item.year5
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="Year1" fill="#8884d8" name="Year 1" />
                <Bar dataKey="Year2" fill="#82ca9d" name="Year 2" />
                <Bar dataKey="Year3" fill="#ffc658" name="Year 3" />
                <Bar dataKey="Year4" fill="#ff8042" name="Year 4" />
                <Bar dataKey="Year5" fill="#0088fe" name="Year 5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Benefits View */}
      {activeView === 'benefits' && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Multi-dimensional Benefits</h2>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={benefitCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {benefitCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      {/* Timeline View */}
      {activeView === 'timeline' && (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Implementation Timeline</h2>
          {implementationTimeline.map((phase, index) => (
            <div key={index} className="mb-8">
              <h3 className="font-bold text-lg">{phase.phase}</h3>
              <p className="text-gray-600 mb-2">{phase.months}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Key Activities</h4>
                  <ul className="list-disc pl-5">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx}>{activity}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Milestones</h4>
                  <ul className="list-disc pl-5">
                    {phase.milestones.map((milestone, idx) => (
                      <li key={idx}>{milestone}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImpactAnalysis;
