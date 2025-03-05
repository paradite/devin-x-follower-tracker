"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Static data for the follower count
const staticFollowerData = [
  { count: 2455, date: '2025-03-05' },
  { count: 2450, date: '2025-03-04' },
  { count: 2445, date: '2025-03-03' },
  { count: 2440, date: '2025-03-02' },
  { count: 2430, date: '2025-03-01' },
  { count: 2425, date: '2025-02-28' },
  { count: 2420, date: '2025-02-27' },
];

export default function Home() {
  const [followerData] = useState(staticFollowerData);

  // Sort data by date
  const sortedData = [...followerData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Sort data by date in descending order (newest first) for table
  const sortedTableData = [...followerData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Devin X Follower Tracker</h1>
          <p className="text-gray-600 mt-2">
            Track the daily follower count of Devin&apos;s X account
          </p>
        </header>

        <div className="mb-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Current follower count: {sortedData[sortedData.length - 1].count.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {sortedData[sortedData.length - 1].date}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Note: This is a static demo. The live version would update daily via a cron job.
          </p>
        </div>

        {/* Follower Graph */}
        <div className="w-full h-80 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Follower Count Over Time</h2>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              data={sortedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Followers"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Follower Table */}
        <div className="w-full bg-white p-4 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-bold mb-4">Follower Count History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Follower Count
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTableData.map((item, index) => {
                  // Calculate change from previous day
                  const previousCount = index < sortedTableData.length - 1 ? sortedTableData[index + 1].count : item.count;
                  const change = item.count - previousCount;
                  
                  return (
                    <tr key={item.date}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.count.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {change !== 0 ? (
                          <span className={`${change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {change > 0 ? '+' : ''}{change.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-gray-500">0</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
