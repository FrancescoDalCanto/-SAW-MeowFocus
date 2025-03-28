import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudyProgress = () => {
    const [weekData, setWeekData] = useState(() => {
        const savedData = localStorage.getItem('studyProgress');
        return savedData ? JSON.parse(savedData) : initializeWeekData();
    });

    function initializeWeekData() {
        return {
            weekNumber: getCurrentWeek(),
            days: Array(7).fill().map(() => ({
                studyMinutes: 0,
                breakMinutes: 0
            }))
        };
    }

    function getCurrentWeek() {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        const week1 = new Date(date.getFullYear(), 0, 4);
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    useEffect(() => {
        const currentWeek = getCurrentWeek();
        if (weekData.weekNumber !== currentWeek) {
            const newData = initializeWeekData();
            setWeekData(newData);
            localStorage.setItem('studyProgress', JSON.stringify(newData));
        }
    }, []);

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const chartData = {
        labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        datasets: [
            {
                label: 'Studio',
                data: weekData.days.map(day => day.studyMinutes / 60),
                backgroundColor: (context) => {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, '#8B5CF6');
                    gradient.addColorStop(1, '#6D28D9');
                    return gradient;
                },
                borderRadius: 8,
                borderWidth: 0,
                hoverBackgroundColor: '#7C3AED',
                categoryPercentage: 0.6,
                barPercentage: 0.9
            },
            {
                label: 'Pause',
                data: weekData.days.map(day => day.breakMinutes / 60),
                backgroundColor: (context) => {
                    const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, '#F59E0B');
                    gradient.addColorStop(1, '#D97706');
                    return gradient;
                },
                borderRadius: 8,
                borderWidth: 0,
                hoverBackgroundColor: '#EA580C',
                categoryPercentage: 0.6,
                barPercentage: 0.9
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                left: 15,
                right: 15
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#E5E7EB',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            y: {
                grid: {
                    color: '#374151',
                    borderDash: [4],
                    drawTicks: false
                },
                ticks: {
                    color: '#9CA3AF',
                    padding: 10,
                    callback: (value) => `${value}h`,
                    maxTicksLimit: 12,
                    stepSize: 2,
                    max: 24,
                    min: 0
                },
                border: { display: false }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#E5E7EB',
                    font: { size: 14 },
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: '#1F2937',
                titleColor: '#E5E7EB',
                bodyColor: '#D1D5DB',
                borderColor: '#374151',
                borderWidth: 1,
                cornerRadius: 8,
                padding: 12,
                usePointStyle: true,
                callbacks: {
                    title: (context) => context[0].label,
                    label: (context) => {
                        const totalMinutes = context.raw * 60;
                        return ` ${context.dataset.label}: ${formatTime(totalMinutes)}`;
                    }
                }
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-gray-800 rounded-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-4 pt-4">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-purple-400 mb-2">
                        Progresso Settimanale
                    </h3>
                    <p className="text-sm text-gray-400">
                        Settimana #{weekData.weekNumber} • {new Date().getFullYear()}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center bg-gray-700 px-4 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-200">
                            Studio: {formatTime(weekData.days.reduce((sum, day) => sum + day.studyMinutes, 0))}
                        </span>
                    </div>
                    <div className="flex items-center bg-gray-700 px-4 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-200">
                            Pause: {formatTime(weekData.days.reduce((sum, day) => sum + day.breakMinutes, 0))}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0 relative p-4">
                <Bar
                    data={chartData}
                    options={options}
                    className="!w-full !h-full"
                />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400 gap-4 px-4 pb-4">
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Dati aggiornati in tempo reale</span>
                </div>
                <div className="hidden sm:block text-gray-500">|</div>
                <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Reset settimanale ogni Lunedì</span>
                </div>
            </div>
        </div>
    );
};

export default StudyProgress;