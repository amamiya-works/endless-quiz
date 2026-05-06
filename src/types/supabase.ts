export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            quizzes: {
                Row: {
                    id: string
                    question_text: string
                    choice_1: string
                    choice_2: string
                    choice_3: string
                    choice_4: string
                    explanation: string
                    is_published: boolean
                    created_at?: string
                }
                Insert: {
                    id?: string
                    question_text: string
                    choice_1: string
                    choice_2?: string
                    choice_3?: string
                    choice_4?: string
                    explanation: string
                    is_published?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    question_text?: string
                    choice_1?: string
                    choice_2?: string
                    choice_3?: string
                    choice_4?: string
                    explanation?: string
                    is_published?: boolean
                    created_at?: string
                }
            }
        }
    }
}
