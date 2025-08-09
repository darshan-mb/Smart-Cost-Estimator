
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, RotateCcw, MapPin, Clock, TrendingUp, Sparkles, Star, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

interface PredictionHistoryProps {
  predictions: Prediction[];
  onReuse: (prediction: Prediction) => void;
}

export const PredictionHistory: React.FC<PredictionHistoryProps> = ({ predictions, onReuse }) => {
  if (predictions.length === 0) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl card-3d glass perspective-1000">
        <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          <CardTitle className="text-xl flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/25 rounded-full backdrop-blur-sm animate-3d-flip">
              <History className="h-6 w-6 animate-pulse" />
            </div>
            <span className="text-white">Recent Predictions</span>
          </CardTitle>
          <CardDescription className="text-indigo-100 relative z-10">
            Your prediction history will appear here ✨
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-12 text-slate-400">
            <div className="relative inline-block animate-float">
              <History className="h-20 w-20 mx-auto mb-4 opacity-50 animate-pulse" />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-blue-400 animate-spin" />
              <Star className="absolute -bottom-2 -left-2 h-6 w-6 text-yellow-400 animate-ping" />
            </div>
            <p className="text-xl font-medium text-white">No predictions yet</p>
            <p className="text-sm text-indigo-100" style={{animationDelay: '0.2s'}}>Start calculating to see your history 🚀</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl card-3d glass perspective-1000">
      <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-t-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        <CardTitle className="text-xl flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/25 rounded-full backdrop-blur-sm animate-3d-flip">
            <History className="h-6 w-6 animate-pulse" />
          </div>
          <span className="text-white">Recent Predictions</span>
        </CardTitle>
        <CardDescription className="text-indigo-100 relative z-10">
          Click to reuse previous calculations ⚡
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {predictions.map((prediction, index) => (
          <div
            key={prediction.id}
            className={`relative p-6 rounded-2xl border-2 border-slate-200/50 dark:border-slate-600/50 bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30 dark:from-slate-700/80 dark:via-slate-800/80 dark:to-slate-700/80 hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 dark:hover:from-slate-600 dark:hover:via-slate-700 dark:hover:to-slate-600 transition-all duration-700 cursor-pointer group transform hover:scale-105 hover:shadow-2xl card-3d perspective-1000 glass animate-fade-in backdrop-blur-sm`}
            style={{ 
              animationDelay: `${index * 200}ms`,
            }}
            onClick={() => onReuse(prediction)}
          >
            {/* Enhanced 3D Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            
            {/* Multiple Floating Effects */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-spin" />
            </div>
            <div className="absolute -top-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Star className="h-4 w-4 text-pink-400 animate-ping" />
            </div>
            <div className="absolute -bottom-2 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Zap className="h-4 w-4 text-blue-400 animate-pulse" />
            </div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <Badge 
                variant="secondary" 
                className="text-2xl font-bold px-6 py-3 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white shadow-2xl transform group-hover:scale-125 transition-all duration-500 neon-glow animate-3d-flip"
              >
                <span className="drop-shadow-lg">${prediction.price.toFixed(2)}</span>
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full p-4 shadow-lg backdrop-blur-sm bg-white/20 dark:bg-slate-700/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onReuse(prediction);
                }}
              >
                <RotateCcw className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-spin group-hover:animate-none" />
              </Button>
            </div>
            
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 relative z-10">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
                  <MapPin className="h-4 w-4 text-white animate-pulse" />
                </div>
                <span className="font-bold text-lg">{prediction.distance} {prediction.unit}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-lg">
                  <Clock className="h-4 w-4 text-white animate-pulse" />
                </div>
                <span className="font-bold text-lg">{prediction.time} {prediction.timeUnit}</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-600/70 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg">
                  <TrendingUp className="h-4 w-4 text-white animate-pulse" />
                </div>
                <span className="font-bold text-lg">{prediction.surgeMultiplier.toFixed(1)}x surge</span>
              </div>
            </div>
            
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-600/50 font-medium relative z-10 flex items-center gap-2">
              <Clock className="h-3 w-3 animate-pulse" />
              <span className="animate-fade-in">
                {formatDistanceToNow(prediction.timestamp, { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
