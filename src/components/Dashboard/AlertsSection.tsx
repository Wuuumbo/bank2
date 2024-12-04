import React from 'react';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  message: string;
  date: string;
}

interface AlertsSectionProps {
  alerts: Alert[];
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Recent Alerts</h3>
        <button className="text-blue-600 hover:text-blue-800 flex items-center">
          View All <ArrowUpRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg flex items-start space-x-3 ${
              alert.type === 'danger'
                ? 'bg-red-50'
                : alert.type === 'warning'
                ? 'bg-yellow-50'
                : 'bg-blue-50'
            }`}
          >
            <AlertTriangle
              className={`w-5 h-5 ${
                alert.type === 'danger'
                  ? 'text-red-500'
                  : alert.type === 'warning'
                  ? 'text-yellow-500'
                  : 'text-blue-500'
              }`}
            />
            <div className="flex-1">
              <p
                className={`text-sm ${
                  alert.type === 'danger'
                    ? 'text-red-800'
                    : alert.type === 'warning'
                    ? 'text-yellow-800'
                    : 'text-blue-800'
                }`}
              >
                {alert.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSection;