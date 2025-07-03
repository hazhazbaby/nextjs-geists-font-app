"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bot } from "lucide-react";
import { useState } from "react";

const StorageCard = ({ color }: { color: string }) => (
  <Card className={`p-5 ${color} rounded-3xl relative overflow-hidden shadow-sm min-h-[140px]`} />
);

const NavButton = ({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) => (
  <button className={`flex flex-col items-center ${active ? 'text-purple-600' : 'text-gray-400'}`}>
    <div className="w-6 h-6 mb-1">{icon}</div>
    <span className="text-xs">{label}</span>
  </button>
);

export default function Home() {
  const [query, setQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate AI response with medical vital signs information
    setTimeout(() => {
      const medicalResponses = {
        'rpm': 'RPM (Respirations Per Minute) is a vital sign that measures breathing rate. Normal adult range: 12-20 breaths per minute. Higher rates (tachypnea) may indicate fever, illness, or other conditions. Lower rates (bradypnea) might suggest medication effects or medical conditions.',
        'vital signs': 'Vital signs are key indicators of health including:\n1. Heart Rate (60-100 beats/min)\n2. Blood Pressure (120/80 mmHg normal)\n3. Temperature (98.6°F/37°C normal)\n4. Respiratory Rate (12-20 breaths/min)\n5. Oxygen Saturation (95-100% normal)',
        'heart rate': 'Heart Rate measures heart beats per minute (BPM). Normal adult resting rate: 60-100 BPM. Athletes may have lower rates. High rates (tachycardia) >100 BPM. Low rates (bradycardia) <60 BPM.',
        'blood pressure': 'Blood Pressure (BP) measures force of blood against artery walls. Format: systolic/diastolic (120/80 mmHg normal). Hypertension: >130/80 mmHg. Hypotension: <90/60 mmHg.',
        'temperature': 'Body Temperature normal range: 97.8°F-99°F (36.5°C-37.2°C). Fever: >100.4°F (38°C). Hypothermia: <95°F (35°C). Measured via oral, temporal, tympanic, or axillary methods.',
        'oxygen saturation': 'Oxygen Saturation (SpO2) measures blood oxygen levels. Normal: 95-100%. Below 92% indicates potential hypoxemia. Measured via pulse oximeter. Critical for respiratory assessment.'
      };

      const response = Object.entries(medicalResponses).reduce((closest, [key, value]) => {
        if (query.toLowerCase().includes(key.toLowerCase())) {
          return value;
        }
        return closest;
      }, 'I can help you understand vital signs and medical measurements. Try asking about specific vital signs like RPM (breathing rate), heart rate, blood pressure, temperature, or oxygen saturation.');

      setAiResponse(response);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <main className="max-w-md mx-auto bg-white min-h-screen pb-20">
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Hello!</h1>
            <h2 className="text-xl font-medium mb-1">Hazel Vasquez</h2>
            <p className="text-sm text-gray-500">Todo sobre tu salud con Maxim</p>
          </div>
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl shadow-lg">
            👑
          </div>
        </div>

        {/* Search with BlackBox AI */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <div className="relative w-full">
              <Input
                placeholder="Search with BlackBox AI..."
                className="pl-12 pr-16 py-6 bg-gray-50 border-none rounded-2xl text-base shadow-sm w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button 
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-purple-500 hover:text-purple-600 transition-colors"
                aria-label="Search with BlackBox AI"
              >
                <Bot className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* AI Response Area */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-h-[120px] transition-all duration-200">
            {isSearching ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-3 border-purple-500 border-t-transparent"></div>
                <p className="text-sm text-gray-500 animate-pulse">BlackBox AI is thinking...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {query && aiResponse ? (
                  <>
                    <div className="flex items-center space-x-2 text-purple-600">
                      <Bot className="h-4 w-4" />
                      <p className="text-sm font-medium">Response to: "{query}"</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {aiResponse}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 text-center space-y-2">
                    <Bot className="h-6 w-6 text-purple-500" />
                    <p className="text-gray-500 text-sm">
                      Ask anything to BlackBox AI...<br />
                      The response will appear here, limited to 200 words.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Storage Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <StorageCard color="bg-[#F0EBFF]" />
          <StorageCard color="bg-[#FFF0EB]" />
          <StorageCard color="bg-[#EBF9FF]" />
          <StorageCard color="bg-[#FFE8F7]" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto flex justify-around py-4">
          <NavButton icon="🏠" label="My Files" active />
          <NavButton icon="📁" label="Folders" />
          <NavButton icon="⬆️" label="Upload" />
          <NavButton icon="🔔" label="Alerts" />
          <NavButton icon="👤" label="Profile" />
        </div>
      </div>
    </main>
  );
}
