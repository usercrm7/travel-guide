import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Calendar, Navigation, Camera, CheckCircle, Circle } from 'lucide-react';

// Veri yapısı
const travelData = {
  "tripInfo": {
    "title": "Ege Turu 2024",
    "duration": "7 gün",
    "startDate": "2024-07-15",
    "endDate": "2024-07-21"
  },
  "cities": [
    {
      "id": 1,
      "name": "İzmir",
      "description": "Ege'nin incisi, tarihi ve modern yaşamın buluşma noktası",
      "visitDate": "2024-07-15",
      "stayDuration": "2 gün",
      "places": [
        {
          "id": 1,
          "name": "Konak Meydanı & Saat Kulesi",
          "category": "Tarihi Mekan",
          "timeOfDay": "sabah",
          "description": "İzmir'in sembolü, Ottoman mimarisi",
          "rating": 4.5,
          "visitTime": "1 saat",
          "tips": "Sabah erkenden fotoğraf çekmek için ideal",
          "visited": false
        },
        {
          "id": 2,
          "name": "Kemeraltı Çarşısı",
          "category": "Alışveriş",
          "timeOfDay": "sabah",
          "description": "Tarihi çarşı, hediyelik eşya ve yerel lezzetler",
          "rating": 4.2,
          "visitTime": "2-3 saat",
          "tips": "Pazarlık yapmayı unutmayın, sabah saatlerinde daha rahat",
          "visited": false
        },
        {
          "id": 3,
          "name": "Kadifekale",
          "category": "Tarihi Mekan",
          "timeOfDay": "sabah",
          "description": "Antik kent kalıntıları ve şehir manzarası",
          "rating": 4.0,
          "visitTime": "1.5 saat",
          "tips": "Sabah erken saatlerde manzara daha güzel",
          "visited": false
        },
        {
          "id": 4,
          "name": "Alsancak Kordon",
          "category": "Yürüyüş",
          "timeOfDay": "akşam",
          "description": "Deniz kenarında yürüyüş, sunset manzarası",
          "rating": 4.8,
          "visitTime": "2 saat",
          "tips": "Sunset için mükemmel, akşam yemeği için çok seçenek",
          "visited": false
        },
        {
          "id": 5,
          "name": "Asansör",
          "category": "Gezi",
          "timeOfDay": "akşam",
          "description": "Tarihi asansör, şehir manzarası ve romantik atmosfer",
          "rating": 4.6,
          "visitTime": "1 saat",
          "tips": "Akşam ışıkları için mükemmel, üstte kafe var",
          "visited": false
        }
      ]
    },
    {
      "id": 2,
      "name": "Muğla",
      "description": "Turkuaz denizler, masmavi koylar ve plajlar",
      "visitDate": "2024-07-17",
      "stayDuration": "2 gün",
      "places": [
        {
          "id": 6,
          "name": "Ölüdeniz",
          "category": "Plaj",
          "timeOfDay": "sabah",
          "description": "Turkiye'nin en ünlü plajı, paragliding merkezi",
          "rating": 4.9,
          "visitTime": "4-5 saat",
          "tips": "Sabah erken git, kalabalık olur. Paragliding rezervasyon yap",
          "visited": false
        },
        {
          "id": 7,
          "name": "Butterfly Valley",
          "category": "Doğa",
          "timeOfDay": "sabah",
          "description": "Kelebek vadisi, doğa yürüyüşü ve saklı plaj",
          "rating": 4.7,
          "visitTime": "3-4 saat",
          "tips": "Yürüyüş ayakkabısı gerekli, su ve atıştırmalık götür",
          "visited": false
        },
        {
          "id": 8,
          "name": "Kaputaş Plajı",
          "category": "Plaj",
          "timeOfDay": "öğlen",
          "description": "Turkuaz sular, instagram fenomeni plaj",
          "rating": 4.8,
          "visitTime": "2-3 saat",
          "tips": "Merdivenler dik, dikkatli in. Fotoğraf için üstten çek",
          "visited": false
        },
        {
          "id": 9,
          "name": "Kalkan Marina",
          "category": "Marina",
          "timeOfDay": "akşam",
          "description": "Butik oteller, güzel restoranlar, romantik akşam",
          "rating": 4.4,
          "visitTime": "2-3 saat",
          "tips": "Akşam yemeği için rezervasyon yap, sunset güzel",
          "visited": false
        }
      ]
    },
    {
      "id": 3,
      "name": "Denizli",
      "description": "Pamukkale travertenleri ve antik Hierapolis",
      "visitDate": "2024-07-19",
      "stayDuration": "1 gün",
      "places": [
        {
          "id": 10,
          "name": "Pamukkale Travertenleri",
          "category": "Doğa",
          "timeOfDay": "sabah",
          "description": "Beyaz kireçtaşı terrasları, dünya mirası",
          "rating": 4.7,
          "visitTime": "3-4 saat",
          "tips": "Ayakkabı çıkart, çok sıcak olabilir. Sabah erkenden git",
          "visited": false
        },
        {
          "id": 11,
          "name": "Hierapolis Antik Kenti",
          "category": "Tarihi Mekan",
          "timeOfDay": "sabah",
          "description": "Antik Roma şehri, tiyatro ve nekropol",
          "rating": 4.3,
          "visitTime": "2-3 saat",
          "tips": "Pamukkale ile aynı bilet, antik havuz ekstra ücretli",
          "visited": false
        }
      ]
    },
    {
      "id": 4,
      "name": "Salda Gölü",
      "description": "Türkiye'nin Maldivleri, beyaz kumlu göl",
      "visitDate": "2024-07-20",
      "stayDuration": "1 gün",
      "places": [
        {
          "id": 12,
          "name": "Salda Gölü Plajı",
          "category": "Göl",
          "timeOfDay": "sabah",
          "description": "Beyaz kum, turkuaz su, Mars'a benzer manzara",
          "rating": 4.8,
          "visitTime": "4-5 saat",
          "tips": "Beyaz kuma zarar verme, sadece bakabilirsin",
          "visited": false
        }
      ]
    },
    {
      "id": 5,
      "name": "Afyonkarahisar",
      "description": "Termal kaynaklar ve tarihi kale",
      "visitDate": "2024-07-20",
      "stayDuration": "Yarım gün",
      "places": [
        {
          "id": 13,
          "name": "Afyon Kalesi",
          "category": "Tarihi Mekan",
          "timeOfDay": "öğlen",
          "description": "Şehrin simgesi, panoramik manzara",
          "rating": 4.2,
          "visitTime": "1.5 saat",
          "tips": "Çıkış biraz zor, rahat ayakkabı gerekli",
          "visited": false
        }
      ]
    },
    {
      "id": 6,
      "name": "Kütahya",
      "description": "Çini sanatı ve tarihi merkez",
      "visitDate": "2024-07-21",
      "stayDuration": "Yarım gün",
      "places": [
        {
          "id": 14,
          "name": "Çini Müzesi ve Atölyeleri",
          "category": "Müze",
          "timeOfDay": "sabah",
          "description": "Kütahya çinisi, el sanatları",
          "rating": 4.3,
          "visitTime": "1.5 saat",
          "tips": "Hediyelik çini alabilirsin, çok kaliteli",
          "visited": false
        }
      ]
    }
  ]
};

const TravelGuideApp = () => {
  const [visitedPlaces, setVisitedPlaces] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentView, setCurrentView] = useState('overview');
  const [myNotes, setMyNotes] = useState({});

  // LocalStorage'dan veri yükleme
  useEffect(() => {
    const savedVisited = localStorage.getItem('visitedPlaces');
    const savedNotes = localStorage.getItem('myNotes');
    
    if (savedVisited) {
      setVisitedPlaces(JSON.parse(savedVisited));
    }
    if (savedNotes) {
      setMyNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Ziyaret durumunu toggle etme
  const toggleVisited = (placeId) => {
    const newVisited = { ...visitedPlaces, [placeId]: !visitedPlaces[placeId] };
    setVisitedPlaces(newVisited);
    localStorage.setItem('visitedPlaces', JSON.stringify(newVisited));
  };

  // Not güncelleme
  const updateNote = (placeId, note) => {
    const newNotes = { ...myNotes, [placeId]: note };
    setMyNotes(newNotes);
    localStorage.setItem('myNotes', JSON.stringify(newNotes));
  };

  // Kategori renkleri
  const getCategoryColor = (category) => {
    const colors = {
      'Tarihi Mekan': 'bg-amber-100 text-amber-800',
      'Plaj': 'bg-blue-100 text-blue-800',
      'Doğa': 'bg-green-100 text-green-800',
      'Alışveriş': 'bg-purple-100 text-purple-800',
      'Yürüyüş': 'bg-teal-100 text-teal-800',
      'Marina': 'bg-cyan-100 text-cyan-800',
      'Göl': 'bg-indigo-100 text-indigo-800',
      'Termal': 'bg-red-100 text-red-800',
      'Müze': 'bg-gray-100 text-gray-800',
      'Gezi': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Zaman dilimi renkleri
  const getTimeColor = (timeOfDay) => {
    const colors = {
      'sabah': 'bg-yellow-50 border-yellow-200',
      'öğlen': 'bg-orange-50 border-orange-200',
      'akşam': 'bg-purple-50 border-purple-200'
    };
    return colors[timeOfDay] || 'bg-gray-50 border-gray-200';
  };

  // İstatistikler
  const getStats = () => {
    const totalPlaces = travelData.cities.reduce((sum, city) => sum + city.places.length, 0);
    const visitedCount = Object.values(visitedPlaces).filter(Boolean).length;
    const totalCities = travelData.cities.length;
    
    return { totalPlaces, visitedCount, totalCities };
  };

  // Ana Sayfa
  const OverviewPage = () => {
    const stats = getStats();
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold">{travelData.tripInfo.title}</h1>
          <p className="mt-2 opacity-90">{travelData.tripInfo.duration} • {travelData.tripInfo.startDate} - {travelData.tripInfo.endDate}</p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-teal-600">{stats.totalCities}</div>
            <div className="text-sm text-gray-600">Şehir</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalPlaces}</div>
            <div className="text-sm text-gray-600">Mekan</div>
          </div>
          <div className="bg-white p-4 rounded-lg border text-center">
            <div className="text-2xl font-bold text-green-600">{stats.visitedCount}</div>
            <div className="text-sm text-gray-600">Gezilen</div>
          </div>
        </div>

        {/* İlerleme Çubuğu */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Seyahat İlerlemesi</span>
            <span className="text-sm text-gray-500">{Math.round((stats.visitedCount / stats.totalPlaces) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-teal-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(stats.visitedCount / stats.totalPlaces) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Şehir Kartları */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Seyahat Güzergahı</h2>
          {travelData.cities.map((city) => {
            const cityVisited = city.places.filter(place => visitedPlaces[place.id]).length;
            const cityTotal = city.places.length;
            
            return (
              <div 
                key={city.id} 
                className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedCity(city);
                  setCurrentView('city');
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{city.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{city.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {city.visitDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {city.stayDuration}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{cityVisited}/{cityTotal}</div>
                    <div className="text-xs text-gray-500">gezilen</div>
                  </div>
                </div>
                
                {/* Mini ilerleme çubuğu */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-teal-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${(cityVisited / cityTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Şehir Detay Sayfası
  const CityDetailPage = ({ city }) => {
    const morningPlaces = city.places.filter(place => place.timeOfDay === 'sabah');
    const noonPlaces = city.places.filter(place => place.timeOfDay === 'öğlen');
    const eveningPlaces = city.places.filter(place => place.timeOfDay === 'akşam');

    const PlaceCard = ({ place }) => (
      <div className={`p-4 rounded-lg border-2 ${getTimeColor(place.timeOfDay)}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h4 className="font-semibold">{place.name}</h4>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(place.category)}`}>
                {place.category}
              </span>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                {place.rating}
              </div>
            </div>
          </div>
          <button
            onClick={() => toggleVisited(place.id)}
            className={`p-1 rounded-full ${visitedPlaces[place.id] ? 'text-green-600' : 'text-gray-400'}`}
          >
            {visitedPlaces[place.id] ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
          </button>
        </div>
        
        <p className="text-gray-700 text-sm mb-2">{place.description}</p>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock className="w-4 h-4 mr-1" />
          {place.visitTime}
        </div>
        
        {place.tips && (
          <div className="bg-yellow-50 border border-yellow-200 p-2 rounded text-sm text-yellow-800 mb-2">
            💡 {place.tips}
          </div>
        )}
        
        <textarea
          placeholder="Kişisel notlarınız..."
          value={myNotes[place.id] || ''}
          onChange={(e) => updateNote(place.id, e.target.value)}
          className="w-full p-2 border rounded text-sm resize-none"
          rows="2"
        />
      </div>
    );

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg">
          <button
            onClick={() => setCurrentView('overview')}
            className="mb-2 text-white/80 hover:text-white"
          >
            ← Geri Dön
          </button>
          <h1 className="text-2xl font-bold">{city.name}</h1>
          <p className="mt-2 opacity-90">{city.description}</p>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {city.visitDate}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {city.stayDuration}
            </div>
          </div>
        </div>

        {/* Sabah Mekanları */}
        {morningPlaces.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              Sabah Gezilecek Yerler
            </h3>
            <div className="space-y-3">
              {morningPlaces.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}

        {/* Öğlen Mekanları */}
        {noonPlaces.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
              Öğlen Gezilecek Yerler
            </h3>
            <div className="space-y-3">
              {noonPlaces.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}

        {/* Akşam Mekanları */}
        {eveningPlaces.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
              Akşam Gezilecek Yerler
            </h3>
            <div className="space-y-3">
              {eveningPlaces.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Navigation Header */}
        <div className="bg-white border-b sticky top-0 z-10 p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-lg">🗺️ Tatil Rehberim</h1>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentView('overview')}
                className={`px-3 py-1 rounded-full text-sm ${currentView === 'overview' ? 'bg-teal-100 text-teal-800' : 'text-gray-600'}`}
              >
                Ana Sayfa
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pb-20">
          {currentView === 'overview' && <OverviewPage />}
          {currentView === 'city' && selectedCity && <CityDetailPage city={selectedCity} />}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t">
          <div className="grid grid-cols-3 py-2">
            <button
              onClick={() => setCurrentView('overview')}
              className="flex flex-col items-center py-2 text-sm"
            >
              <Navigation className="w-5 h-5 mb-1" />
              Güzergah
            </button>
            <button
              onClick={() => {
                const element = document.createElement('a');
                const file = new Blob([JSON.stringify({visitedPlaces, myNotes}, null, 2)], {type: 'application/json'});
                element.href = URL.createObjectURL(file);
                element.download = 'seyahat-notlarim.json';
                element.click();
              }}
              className="flex flex-col items-center py-2 text-sm"
            >
              <Camera className="w-5 h-5 mb-1" />
              Notları İndir
            </button>
            <button
              onClick={() => {
                const stats = getStats();
                if (navigator.share) {
                  navigator.share({
                    title: 'Ege Turu 2024',
                    text: `${stats.visitedCount}/${stats.totalPlaces} yer gezdim! 🎉`,
                    url: window.location.href
                  });
                }
              }}
              className="flex flex-col items-center py-2 text-sm"
            >
              <MapPin className="w-5 h-5 mb-1" />
              Paylaş
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelGuideApp;