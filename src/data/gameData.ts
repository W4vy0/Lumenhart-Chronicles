import { LucideIcon } from 'lucide-react';

export interface Character {
  id: string;
  name: string;
  role: string;
  mbti: string;
  age: number;
  element: string;
  description: string;
  appearance: {
    hairColor: string;
    eyeColor: string;
    height: string;
    bodyType: string;
    outfit: string;
  };
  stats: {
    mp: number;
    sp: number;
  };
  color: string;
  imageUrl: string;
}

export interface Region {
  id: string;
  name: string;
  type: 'bureau' | 'dungeon' | 'forest' | 'village' | 'inn' | 'castle';
  description: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  imageUrl: string;
}

export interface Monster {
  id: string;
  name: string;
  rank: 'General' | 'Mid-Boss' | 'Boss';
  description: string;
}

export const MONSTERS: Monster[] = [
  // General Monsters
  {
    id: 'skeleton',
    name: '스켈레톤 보병',
    rank: 'General',
    description: '부서진 갑옷을 입은 해골 병사. 녹슨 검이나 창을 들고 느리지만 끈질기게 공격한다.'
  },
  {
    id: 'bat',
    name: '던전 박쥐 떼',
    rank: 'General',
    description: '천장에 매달려 있다가 침입자를 발견하면 무리를 이루어 습격한다.'
  },
  {
    id: 'slime',
    name: '슬라임',
    rank: 'General',
    description: '지면의 습기와 마력이 뒤섞여 만들어진 젤리 형태의 몬스터. 공격력은 낮지만 수가 많다.'
  },
  {
    id: 'rat',
    name: '어둠 쥐',
    rank: 'General',
    description: '일반 쥐보다 훨씬 크며 날카로운 이빨로 공격한다.'
  },
  // Mid-Bosses
  {
    id: 'dark_knight',
    name: '암흑 기사',
    rank: 'Mid-Boss',
    description: '저주받은 갑옷에 깃든 영혼. 검술이 뛰어나며 일반 몬스터보다 훨씬 강하다.'
  },
  {
    id: 'spider',
    name: '거대 동굴거미',
    rank: 'Mid-Boss',
    description: '천장과 벽을 타고 이동하며 독을 사용한다.'
  },
  {
    id: 'gargoyle',
    name: '가고일',
    rank: 'Mid-Boss',
    description: '돌조각상에서 깨어나는 몬스터. 날개로 활공하며 공격한다.'
  },
  // Boss
  {
    id: 'lich',
    name: '심연의 리치',
    rank: 'Boss',
    description: '던전을 지배하는 고대 마법사 언데드.'
  }
];

export const CHARACTERS: Character[] = [
  {
    id: 'laelyn',
    name: '라엘린 (Laelyn)',
    role: '빛의 힐러',
    mbti: 'INFJ',
    age: 22,
    element: '빛',
    description: '책임감이 강하고 헌신적인 성품을 지녔어요. 순수하고 온화한 마음으로 파티를 이끌며, 언제나 침착하고 다정한 말투로 동료들을 보살핍니다.',
    appearance: {
      hairColor: '긴 하얀색 웨이브',
      eyeColor: '신비로운 노란색',
      height: '165cm',
      bodyType: '슬림함',
      outfit: '하얀 로브형 드레스'
    },
    stats: { mp: 100, sp: 100 },
    color: 'text-yellow-200',
    imageUrl: 'https://i.postimg.cc/MKFyM7HM/R.jpg'
  },
  {
    id: 'kaia',
    name: '카이아 (Kaia)',
    role: '물의 힐러',
    mbti: 'INFP',
    age: 23,
    element: '물',
    description: '다소 소심하지만 배려심이 깊고 친절해요. 당황하면 말을 조금 더듬기도 하지만, 전투에 임할 때는 누구보다 적극적입니다.',
    appearance: {
      hairColor: '하늘색 숏컷 곱슬',
      eyeColor: '깊은 남색',
      height: '162cm',
      bodyType: '글래머러스',
      outfit: '하늘색 노출있는 로브'
    },
    stats: { mp: 100, sp: 100 },
    color: 'text-blue-300',
    imageUrl: 'https://i.postimg.cc/4xHpzYHY/K.png'
  },
  {
    id: 'serena',
    name: '세레나 (Serena)',
    role: '어둠의 힐러',
    mbti: 'ENTP',
    age: 23,
    element: '어둠',
    description: '여유롭고 장난기가 많으며, 매혹적인 분위기를 풍겨요. 사교적인 성격으로 누구와도 금방 친해지며, 격식 없는 편안한 대화를 즐깁니다.',
    appearance: {
      hairColor: '흑발 긴 생머리',
      eyeColor: '매혹적인 보라색',
      height: '168cm',
      bodyType: '볼륨감 있음',
      outfit: '검은색 오프숄더 드레스'
    },
    stats: { mp: 100, sp: 100 },
    color: 'text-purple-400',
    imageUrl: 'https://i.postimg.cc/xT4KJv81/F.jpg'
  },
  {
    id: 'lumiel',
    name: '루미엘 (Lumiel)',
    role: '자연의 힐러',
    mbti: 'ENFP',
    age: 20,
    element: '자연',
    description: '순수하고 밝은 에너지가 넘치는 분이에요. 솔직한 애정 표현을 아끼지 않으며, 파티원 모두를 깊이 아끼는 따뜻한 마음을 가졌습니다.',
    appearance: {
      hairColor: '노란 곱슬 긴 머리',
      eyeColor: '싱그러운 연두색',
      height: '160cm',
      bodyType: '아담하고 볼륨감 있음',
      outfit: '초록색 로브형 드레스'
    },
    stats: { mp: 100, sp: 100 },
    color: 'text-green-400',
    imageUrl: 'https://i.postimg.cc/Z5v6rWvB/J.png'
  }
];

export const REGIONS: Region[] = [
  {
    id: 'bureau',
    name: '왕립 마도 의뢰청',
    type: 'bureau',
    description: '루멘하르트 왕국의 모든 의뢰가 모이는 곳입니다. 마법사들과 용사들이 오가는 활기찬 장소로, 신비로운 마력의 기운이 감돕니다.',
    x: 35,
    y: 65,
    imageUrl: 'https://i.postimg.cc/tRrrkVJc/5.png'
  },
  {
    id: 'dungeon',
    name: '고대 던전',
    type: 'dungeon',
    description: '잊혀진 고대의 유적지입니다. 위험한 마물들이 도사리고 있지만, 그만큼 귀중한 보물과 비밀이 숨겨져 있습니다.',
    x: 23,
    y: 35,
    imageUrl: 'https://i.postimg.cc/Wp998JzC/4.png'
  },
  {
    id: 'forest',
    name: '비밀의 숲',
    type: 'forest',
    description: '요정들의 속삭임이 들리는 신비로운 숲입니다. 자연의 마력이 충만하여 치유의 힘을 얻을 수 있는 곳이기도 합니다.',
    x: 78,
    y: 42,
    imageUrl: 'https://i.postimg.cc/3rLL1DWJ/6.png'
  },
  {
    id: 'village',
    name: '시작의 마을',
    type: 'village',
    description: '모험가들이 여정을 시작하는 평화로운 마을입니다. 따뜻한 인심과 활기찬 시장이 여행자들을 반겨줍니다.',
    x: 70,
    y: 72,
    imageUrl: 'https://i.postimg.cc/mZddjFhf/3.png'
  },
  {
    id: 'inn',
    name: '달빛 여관',
    type: 'inn',
    description: '지친 모험가들이 휴식을 취하는 아늑한 여관입니다. 맛있는 음식과 따뜻한 잠자리, 그리고 흥미로운 소문들이 가득합니다.',
    x: 35,
    y: 85,
    imageUrl: 'https://i.postimg.cc/bY66g2r7/2.png'
  },
  {
    id: 'castle',
    name: '마왕성',
    type: 'castle',
    description: '검은 안개에 싸인 불길한 성입니다. 왕국을 위협하는 마왕이 머무는 곳으로, 강력한 결계로 보호받고 있습니다.',
    x: 60,
    y: 20,
    imageUrl: 'https://i.postimg.cc/rygGcXL4/1.png'
  }
];
