import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { PredictionHistory } from '@/components/PredictionHistory';
import { InfoTooltip } from '@/components/InfoTooltip';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { LoadingButton } from '@/components/LoadingButton';
import { toast } from '@/hooks/use-toast';
import { Calculator, Clock, MapPin, TrendingUp, Zap, Sparkles, Star, Loader2 } from 'lucide-react';

interface Prediction {
  id: string;
  distance: number;
  time: number;
  surgeMultiplier: number;
  price: number;
  timestamp: Date;
  unit: 'km' | 'miles';
  timeUnit: 'minutes' | 'hours';
  rideType: 'ola'| 'uber' | 'nammaYatri';
}

  const ridePricing = {
  ola: { baseFare: 20, perKm: 58.76, perMin: 2 },
  uber: { baseFare: 25, perKm: 41.22, perMin: 1.5 },
  nammaYatri: { baseFare: 20, perKm: 53.11, perMin: 1 },
};

  const Index = () => {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [surgeMultiplier, setSurgeMultiplier] = useState([1]);
  const [unit, setUnit] = useState<'km' | 'miles'>('km');
  const [timeUnit, setTimeUnit] = useState<'minutes' | 'hours'>('minutes');
  const [rideType, setRideType] = useState<'ola' | 'uber' | 'nammaYatri'>('ola');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [errors, setErrors] = useState<{distance?: string; time?: string}>({});
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const validateInputs = () => {
    const newErrors: {distance?: string; time?: string} = {};
    
    if (!distance || isNaN(Number(distance)) || Number(distance) <= 0) {
      newErrors.distance = 'Distance must be a positive number';
    }
    
    if (!time || isNaN(Number(time)) || Number(time) <= 0) {
      newErrors.time = 'Time must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePrice = async () => {
    if (!validateInputs()) {
      toast({
        title: "Validation Error",
        description: "Please fix the input errors before proceeding.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setShowResult(false);
    setShowConfetti(false);
    
    // Simulate API call with a realistic price calculation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { baseFare, perKm, perMin } = ridePricing[rideType];
    const Distance = unit === "miles" ? Number(distance) * 1.60934 : Number(distance)
    const time1 = timeUnit === "hours" ? Number(time) * 60 : Number(time)
    const calculatedPrice = ((baseFare + (perKm * Distance) + (perMin * time1)) * surgeMultiplier[0]) / 86;

    setPredictedPrice(calculatedPrice);
    setShowResult(true);
    setShowConfetti(true);
    setIsLoading(false);

  // Add to history
    const newPrediction: Prediction = {
    id: Date.now().toString(),
    distance: Number(distance),
    time: Number(time),
    surgeMultiplier: surgeMultiplier[0],
    price: calculatedPrice,
    timestamp: new Date(),
    unit,
    timeUnit,
    rideType,
  };

  setPredictions(prev => [newPrediction, ...prev.slice(0, 4)]);
  toast({
    title: "Price Predicted!",
    description: `Estimated cost: $${calculatedPrice.toFixed(2)}`,
  });
    setTimeout(() => setShowConfetti(false), 3000);
  };

    const handlePredictionReuse = (prediction: Prediction) => {
    setDistance(prediction.distance.toString());
    setTime(prediction.time.toString());
    setSurgeMultiplier([prediction.surgeMultiplier]);
    setUnit(prediction.unit);
    setTimeUnit(prediction.timeUnit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-all duration-700 animated-gradient">
      <Navbar darkMode={darkMode} onDarkModeToggle={setDarkMode} />
      
      {/* Enhanced 3D Floating geometric shapes for background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-xl animate-float opacity-70"></div>
        {/*<div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/30 to-orange-400/30 rounded-full blur-lg animate-bounce opacity-60"></div>*/}
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full blur-2xl animate-pulse opacity-50"></div>
        {/*<div className="absolute bottom-40 right-1/3 w-20 h-20 bg-gradient-to-r from-yellow-400/30 to-pink-400/30 rounded-full blur-md animate-bounce opacity-80"></div>*/}
        
        {/* 3D Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Form with 3D Effects */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl transform hover:scale-[1.02] transition-all duration-500 hover:shadow-3xl card-3d glass perspective-1000">
              <CardHeader className="space-y-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-t-lg transform-style-3d">
                <CardTitle className="text-3xl font-bold flex items-center gap-3 transform hover:scale-105 transition-transform duration-300 animate-scale-in">
                  <div className="p-3 bg-white/25 rounded-full backdrop-blur-sm animate-pulse neon-glow">
                    <Calculator className="h-8 w-8 animate-wiggle" />
                  </div>
                  <span className="text-white">Smart Cost Estimator</span>
                  <div className="flex items-center gap-4">
                    <Label className="text-lg font-semibold text-white">Select Ride</Label>
                    <select
                      value={rideType}
                      onChange={(e) => setRideType(e.target.value as 'ola' | 'uber' | 'nammaYatri')}
                      className="text-base px-4 py-2 rounded-md bg-white text-slate-700 shadow-lg dark:bg-slate-700 dark:text-white
                                transform transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-x-3 hover:rotate-y-3
                                focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="ola">Ola</option>
                      <option value="uber">Uber</option>
                      <option value="nammaYatri">Namma Yatri</option>
                    </select>
                  </div>
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg animate-fade-in">
                  Get accurate predictions based on the trained cost price ✨
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                {/* Enhanced Distance Input with 3D Effects */}
                <div className="space-y-3 group animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg transform hover:rotate-12 transition-transform duration-300">
                      <MapPin className="h-5 w-5 text-white animate-pulse" />
                    </div>
                    <Label htmlFor="distance" className="text-lg font-semibold text-slate-700 dark:text-slate-300">Distance</Label>
                    <InfoTooltip content="The total distance of your trip" />
                  </div>
                  <div className="flex gap-3">
                    <Input
                      id="distance"
                      type="number"
                      placeholder="Enter distance"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className={`text-lg p-4 border-2 rounded-xl transition-all duration-500 transform hover:scale-105 focus:scale-105 hover:shadow-xl focus:shadow-2xl ${
                        errors.distance 
                          ? 'border-green-500 animate-pulse shadow-green-200 dark:shadow-green-800 animate-wiggle' 
                          : 'border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-200 dark:focus:shadow-blue-800 hover:shadow-blue-100'
                      }`}
                    />
                    <div className="flex rounded-xl border-2 border-slate-200 dark:border-slate-600 overflow-hidden shadow-lg">
                      <Button
                        type="button"
                        variant={unit === 'km' ? 'default' : 'ghost'}
                        size="lg"
                        onClick={() => setUnit('km')}
                        className={`w-28 rounded-none px-6 text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-lg ${
                          unit === 'km' 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg neon-glow animate-glow' 
                            : 'hover:bg-blue-50 dark:hover:bg-blue-900/50'
                        }`}
                      >
                        KM
                      </Button>
                      <Button
                        type="button"
                        variant={unit === 'miles' ? 'default' : 'ghost'}
                        size="lg"
                        onClick={() => setUnit('miles')}
                        className={`rounded-none px-6 text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-lg ${
                          unit === 'miles' 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg neon-glow animate-glow' 
                            : 'hover:bg-blue-50 dark:hover:bg-blue-900/50'
                        }`}
                      >
                        Miles
                      </Button>
                    </div>
                  </div>
                  {errors.distance && (
                    <p className="text-white-500 font-medium animate-bounce flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-spin" />
                      {errors.distance}
                    </p>
                  )}
                </div>

                {/* Enhanced Time Input with 3D Effects */}
                <div className="space-y-3 group animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg transform hover:rotate-12 transition-transform duration-300">
                      <Clock className="h-5 w-5 text-white animate-pulse" />
                    </div>
                    <Label htmlFor="time" className="text-lg font-semibold text-slate-700 dark:text-slate-300">Duration</Label>
                    <InfoTooltip content="Expected duration of your trip" />
                  </div>
                  <div className="flex gap-3">
                    <Input
                      id="time"
                      type="number"
                      placeholder="Enter time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`text-lg p-4 border-2 rounded-xl transition-all duration-500 transform hover:scale-105 focus:scale-105 hover:shadow-xl focus:shadow-2xl ${
                        errors.time 
                          ? 'border-blue-500 animate-pulse shadow-blue-200 dark:shadow-blue-800 animate-wiggle' 
                          : 'border-slate-200 dark:border-slate-600 focus:border-green-500 focus:shadow-lg focus:shadow-green-200 dark:focus:shadow-green-800 hover:shadow-green-100'
                      }`}
                    />
                    <div className="flex rounded-xl border-2 border-slate-200 dark:border-slate-600 overflow-hidden shadow-lg">
                      <Button
                        type="button"
                        variant={timeUnit === 'minutes' ? 'default' : 'ghost'}
                        size="lg"
                        onClick={() => setTimeUnit('minutes')}
                        className={`w-32 rounded-none px-6 text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-lg ${
                          timeUnit === 'minutes' 
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg neon-glow animate-glow' 
                            : 'hover:bg-green-50 dark:hover:bg-green-900/50'
                        }`}
                      >
                        Min
                      </Button>
                      <Button
                        type="button"
                        variant={timeUnit === 'hours' ? 'default' : 'ghost'}
                        size="lg"
                        onClick={() => setTimeUnit('hours')}
                        className={`rounded-none px-6 text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-lg ${
                          timeUnit === 'hours' 
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg neon-glow animate-glow' 
                            : 'hover:bg-green-50 dark:hover:bg-green-900/50'
                        }`}
                      >
                        Hours
                      </Button>
                    </div>
                  </div>
                  {errors.time && (
                    <p className="text-white-500 font-medium animate-bounce flex items-center gap-2">
                      <Sparkles className="h-4 w-4 animate-spin" />
                      {errors.time}
                    </p>
                  )}
                </div>

                {/* Enhanced Surge Multiplier with 3D Effects */}
                <div className="space-y-6 group animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg transform hover:rotate-12 transition-transform duration-300">
                      <TrendingUp className="h-5 w-5 text-white animate-pulse" />
                    </div>
                    <Label className="text-lg font-semibold text-slate-700 dark:text-slate-300">Surge Multiplier</Label>
                    <InfoTooltip content="Multiplier applied during high-demand periods. 1.0x = normal pricing, 2.0x = double pricing" />
                  </div>
                  <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl shadow-lg glass border border-purple-200/50 dark:border-white-700/50">
                    <Slider
                      value={surgeMultiplier}
                      onValueChange={setSurgeMultiplier}
                      max={3}
                      min={1}
                      step={0.1}
                      className="w-full h-3 hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">1.0x</span>
                      <Badge 
                        variant="secondary" 
                        className="px-6 py-2 text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white transform hover:scale-125 transition-all duration-500 shadow-2xl neon-glow animate-3d-flip"
                      >
                        {surgeMultiplier[0].toFixed(1)}x
                      </Badge>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">3.0x</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Predict Button with 3D Effects */}
                <Button
                  onClick={calculatePrice}
                  disabled={isLoading}
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-red-600 via-red-600 to-red-600 text-white rounded-xl transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 relative overflow-hidden group perspective-1000 animate-bounce-in"
                  style={{animationDelay: '0.6s'}}
                >
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  
                  {isLoading ? (
                    <div className="flex items-center gap-3 relative z-20">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Calculating...</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 relative z-20">
                      <Zap className="h-6 w-6 animate-pulse" />
                      <span>Predict Price</span>
                      <Sparkles className="h-6 w-6 animate-spin" />
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Result Card with Advanced 3D Effects */}
            {showResult && predictedPrice !== null && (
              <Card className={`relative shadow-2xl border-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-900/40 dark:via-blue-900/40 dark:to-purple-900/40 backdrop-blur-xl transform transition-all duration-1000 hover:scale-105 card-3d perspective-1000 ${
                showResult ? 'animate-bounce-in scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}>
                {/* Enhanced Confetti Effect */}
                {showConfetti && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                    {[...Array(25)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full falling-confetti"
                        style={{
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random()}s`,
                          backgroundColor: ['#FFD700', '#4ECDC4', '#45B7D1'][i % 3],
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20 rounded-lg blur-xl animate-pulse"></div>
                
                <CardContent className="p-8 text-center space-y-6 relative z-10">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 shadow-2xl transform hover:rotate-12 transition-all duration-500 neon-glow animate-3d-flip">
                    <Calculator className="h-12 w-12 text-white animate-pulse" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold text-slate-700 dark:text-slate-200 animate-fade-in">🎯 Estimated Cost</h3>
                    <div className="flex items-center justify-center gap-3">
                      <Star className="h-8 w-8 text-yellow-500 animate-spin" />
                      <AnimatedNumber 
                        value={predictedPrice} 
                        className="text-7xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl"
                        prefix="$"
                        duration={2000}
                      />
                      <Star className="h-8 w-8 text-yellow-500 animate-spin" style={{animationDirection: 'reverse'}} />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-8 text-lg text-slate-600 dark:text-slate-400 flex-wrap">
                    <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-slate-700/60 rounded-lg backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-300">
                      <MapPin className="h-6 w-6 text-blue-500 animate-pulse" />
                      <span className="font-semibold">{distance} {unit}</span>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-slate-700/60 rounded-lg backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-300">
                      <Clock className="h-6 w-6 text-green-500 animate-pulse" />
                      <span className="font-semibold">{time} {timeUnit}</span>
                    </div>
                    <Separator orientation="vertical" className="h-8" />
                    <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-slate-700/60 rounded-lg backdrop-blur-sm shadow-lg transform hover:scale-110 transition-all duration-300">
                      <TrendingUp className="h-6 w-6 text-white-500 animate-pulse" />
                      <span className="font-semibold">{surgeMultiplier[0].toFixed(1)}x surge</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enhanced Sidebar with 3D Effects */}
          <div className="space-y-8">
            {/* Enhanced Dark Mode Toggle */}
            <Card className="shadow-xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl transform hover:scale-105 transition-all duration-500 card-3d glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="text-lg font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className="text-2xl">🌙</span>
                    Dark Mode
                  </Label>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="scale-125 hover:scale-150 transition-transform duration-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Enhanced History with 3D Effects */}
            <div className="transform hover:scale-105 transition-all duration-500 animate-fade-in" style={{animationDelay: '0.8s'}}>
              <PredictionHistory 
                predictions={predictions}
                onReuse={handlePredictionReuse}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;