-- Create ENUM types for categories and difficulties
CREATE TYPE challenge_category AS ENUM ('web', 'crypto', 'forensics', 'reverse', 'pwn', 'misc');
CREATE TYPE challenge_difficulty AS ENUM ('easy', 'medium', 'hard');

-- Challenges table
CREATE TABLE challenges (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    category challenge_category NOT NULL,
    difficulty challenge_difficulty NOT NULL,
    points INTEGER NOT NULL,
    flag TEXT NOT NULL,
    hints TEXT,
    files TEXT, -- This could be a path or a link to files
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- User challenges table to track completion
CREATE TABLE user_challenges (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id BIGINT NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false NOT NULL,
    completed_at TIMESTAMPTZ,
    UNIQUE (user_id, challenge_id)
);

-- Achievements table
CREATE TABLE achievements (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL, -- e.g., 'fa-trophy'
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- User achievements table to track earned achievements
CREATE TABLE user_achievements (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_id BIGINT NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (user_id, achievement_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Create policies for challenges
CREATE POLICY "Allow authenticated users to read challenges" ON challenges FOR SELECT TO authenticated USING (true);

-- Create policies for user_challenges
CREATE POLICY "Allow users to see their own challenge completions" ON user_challenges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert their own challenge completions" ON user_challenges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for achievements
CREATE POLICY "Allow authenticated users to read achievements" ON achievements FOR SELECT TO authenticated USING (true);

-- Create policies for user_achievements
CREATE POLICY "Allow users to see their own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert their own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample data for challenges
INSERT INTO challenges (name, description, category, difficulty, points, flag, hints, files) VALUES
('Web Basics', 'Find the hidden flag in this simple web application.', 'web', 'easy', 25, 'hacklab{web_basics_completed}', 'Check the source code.\nLook for hidden elements.', 'web_basics.zip'),
('Crypto 101', 'Decrypt the message to find the flag.', 'crypto', 'easy', 30, 'hacklab{crypto_101_solved}', 'This is a classic Caesar cipher.\nThe shift is related to the challenge name.', 'encrypted.txt'),
('Memory Forensics', 'Analyze the memory dump to find the malicious process.', 'forensics', 'medium', 40, 'hacklab{memory_forensics_master}', 'Use Volatility to analyze the dump.\nLook for unusual processes.', 'memory.dump'),
('Binary Exploitation', 'Exploit the buffer overflow vulnerability to get the flag.', 'pwn', 'hard', 60, 'hacklab{buffer_overflow_expert}', 'The program is vulnerable to a buffer overflow.\nTry to overwrite the return address.', 'vuln.c,vuln'),
('Reverse Engineering Challenge', 'Reverse engineer the binary to find the correct input.', 'reverse', 'medium', 45, 'hacklab{reverse_engineering_pro}', 'The program checks for a specific input.\nUse a debugger to analyze the validation routine.', 'reverse_me.exe');

-- Insert sample data for achievements
INSERT INTO achievements (name, description, icon) VALUES
('First Blood', 'Complete your first challenge', 'fa-trophy'),
('Web Master', 'Complete 5 web challenges', 'fa-globe'),
('Crypto Expert', 'Complete all crypto challenges', 'fa-key'),
('Forensics Investigator', 'Complete 3 forensics challenges', 'fa-search'),
('All-Around Hacker', 'Complete at least one challenge in each category', 'fa-star'); 