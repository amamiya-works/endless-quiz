import { Database } from '@/types/supabase'

type Quiz = Database['public']['Tables']['quizzes']['Row']

export const mockQuizzes: Quiz[] = [
    {
        id: '1',
        question_text: '日本の首都はどこですか？',
        choice_1: '東京',
        choice_2: '大阪',
        choice_3: '京都',
        choice_4: '福岡',
        explanation: '現在の日本の首都は東京です。',
        is_published: true,
    },
    {
        id: '2',
        question_text: '次のうち、一般的にプログラミング言語として分類されないものはどれですか？',
        choice_1: 'HTML',
        choice_2: 'Python',
        choice_3: 'JavaScript',
        choice_4: 'Ruby',
        explanation: 'HTMLはマークアップ言語であり、ロジックを記述するプログラミング言語とは区別されることがあります。',
        is_published: true,
    },
    {
        id: '3',
        question_text: '空が青い主な理由は何ですか？',
        choice_1: 'レイリー散乱',
        choice_2: 'ミー散乱',
        choice_3: 'ドップラー効果',
        choice_4: 'チンダル現象',
        explanation: '太陽光が大気中の分子に衝突し、波長の短い青い光が散乱するためです（レイリー散乱）。',
        is_published: true,
    },
    {
        id: '4',
        question_text: '次のうち、偶数はどれですか？',
        choice_1: '2',
        choice_2: '1',
        choice_3: '3',
        choice_4: '5',
        explanation: '2は2で割り切れるため偶数です。',
        is_published: true,
    },
    {
        id: '5',
        question_text: '日本で一番高い山は？',
        choice_1: '富士山',
        choice_2: '北岳',
        choice_3: '奥穂高岳',
        choice_4: '間ノ岳',
        explanation: '富士山は標高3,776mで日本最高峰です。',
        is_published: true,
    },
    {
        id: '6',
        question_text: '世界で最も話されている言語は？',
        choice_1: '英語',
        choice_2: '中国語',
        choice_3: 'スペイン語',
        choice_4: 'ヒンディー語',
        explanation: 'ネイティブスピーカー数と非ネイティブを合わせると英語が最多です。',
        is_published: true,
    }
]
