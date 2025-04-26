-- Enable extensions if required
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- SQL schema for the listings table
CREATE TABLE listings (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    price NUMERIC,
    bedrooms INTEGER,
    bathrooms INTEGER,
    square_footage INTEGER,
    lot_size INTEGER,
    year_built INTEGER,
    property_type TEXT,
    description TEXT
);

-- Table: journey_tasks
CREATE TABLE public.journey_tasks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL DEFAULT auth.uid(),
    task_name text,
    status text,
    assigned_agent text,
    updated_at timestamp DEFAULT now()
);

-- Table: agent_activities
CREATE TABLE public.agent_activities (
    id uuid PRIMARY KEY,
    agent_id uuid NOT NULL,
    task_id uuid NOT NULL,
    started_at timestamp DEFAULT now(),
    completed_at timestamp,
    status text DEFAULT 'running',
    details jsonb,
    bias_check_result jsonb,
    human_reviewed boolean DEFAULT false
);

-- Table: documents
CREATE TABLE public.documents (
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL,
    property_id uuid,
    task_id uuid,
    type text NOT NULL,
    url text NOT NULL,
    version integer DEFAULT 1,
    verified boolean DEFAULT false,
    uploaded_at timestamp DEFAULT now(),
    reviewed_by text
);

-- Table: financial_records
CREATE TABLE public.financial_records (
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL,
    type text NOT NULL,
    url text NOT NULL,
    verified boolean DEFAULT false,
    uploaded_at timestamp DEFAULT now()
);

-- Table: escalations
CREATE TABLE public.escalations (
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL,
    agent_id uuid,
    related_task_id uuid,
    type text NOT NULL,
    status text DEFAULT 'open',
    created_at timestamp DEFAULT now(),
    resolution_details text,
    audit_trail jsonb
);

-- Enable Row-Level Security (RLS) for user-specific access
ALTER TABLE public.journey_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalations ENABLE ROW LEVEL SECURITY;

-- Policies for user-specific access
CREATE POLICY "user_can_access_own_journey_tasks" ON public.journey_tasks
    USING (user_id = auth.uid());
CREATE POLICY "user_can_access_own_agent_activities" ON public.agent_activities
    USING (agent_id = auth.uid());
CREATE POLICY "user_can_access_own_documents" ON public.documents
    USING (user_id = auth.uid());
CREATE POLICY "user_can_access_own_financial_records" ON public.financial_records
    USING (user_id = auth.uid());
CREATE POLICY "user_can_access_own_escalations" ON public.escalations
    USING (user_id = auth.uid());