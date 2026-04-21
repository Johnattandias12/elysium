-- ============================================================
-- SISTEMA DE ORGANIZACAO PESSOAL — MIGRATION COMPLETA
-- Cole este arquivo inteiro no Supabase SQL Editor e clique Run
-- ============================================================

create extension if not exists "uuid-ossp";

-- TABELA: profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  notification_phone text,
  weekly_study_goal_hours int default 20,
  monthly_savings_goal numeric(10,2) default 1000.00,
  active_domains text[] default array['finance','study','health','routine'],
  timezone text default 'America/Fortaleza',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- TABELA: activities
create table if not exists activities (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  type text not null check (type in ('workout','study','meal','other')),
  title text not null,
  description text,
  duration_minutes int,
  intensity text check (intensity in ('low','medium','high')),
  quality int check (quality between 1 and 5),
  metadata jsonb default '{}',
  occurred_at timestamptz default now(),
  created_at timestamptz default now()
);

-- TABELA: transactions
create table if not exists transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  type text not null check (type in ('income','expense')),
  amount numeric(10,2) not null check (amount > 0),
  description text not null,
  category text not null,
  tags text[] default '{}',
  occurred_at date default current_date,
  created_at timestamptz default now()
);

-- TABELA: routines
create table if not exists routines (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  domain text not null check (domain in ('health','study','finance','personal')),
  frequency text not null check (frequency in ('daily','weekdays','weekends','weekly','monthly')),
  day_of_week int check (day_of_week between 0 and 6),
  target_time time,
  duration_minutes int,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- TABELA: checklist_items
create table if not exists checklist_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  routine_id uuid references routines(id) on delete set null,
  title text not null,
  domain text not null check (domain in ('health','study','finance','personal','routine')),
  date date default current_date,
  is_completed boolean default false,
  completed_at timestamptz,
  notes text,
  sort_order int default 0,
  created_at timestamptz default now(),
  unique(user_id, routine_id, date)
);

-- INDICES DE PERFORMANCE
create index if not exists idx_activities_user_date on activities(user_id, occurred_at desc);
create index if not exists idx_activities_type on activities(user_id, type, occurred_at desc);
create index if not exists idx_transactions_user_date on transactions(user_id, occurred_at desc);
create index if not exists idx_transactions_category on transactions(user_id, category, occurred_at desc);
create index if not exists idx_checklist_user_date on checklist_items(user_id, date desc);
create index if not exists idx_routines_user_active on routines(user_id, is_active);

-- ROW LEVEL SECURITY
alter table profiles enable row level security;
alter table activities enable row level security;
alter table transactions enable row level security;
alter table routines enable row level security;
alter table checklist_items enable row level security;

create policy "profiles: acesso proprio" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "activities: acesso proprio" on activities for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "transactions: acesso proprio" on transactions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "routines: acesso proprio" on routines for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "checklist_items: acesso proprio" on checklist_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- TRIGGER: criar profile apos signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- TRIGGER: atualizar updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on profiles
  for each row execute function public.handle_updated_at();

-- FUNCAO: resumo financeiro do mes
create or replace function public.get_monthly_summary(p_user_id uuid, p_month date default date_trunc('month', now())::date)
returns json language plpgsql security definer
as $$
declare
  v_income numeric;
  v_expense numeric;
  v_goal numeric;
begin
  select
    coalesce(sum(case when type = 'income' then amount else 0 end), 0),
    coalesce(sum(case when type = 'expense' then amount else 0 end), 0)
  into v_income, v_expense
  from transactions
  where user_id = p_user_id
    and date_trunc('month', occurred_at) = date_trunc('month', p_month);

  select monthly_savings_goal into v_goal from profiles where id = p_user_id;

  return json_build_object(
    'income', v_income,
    'expense', v_expense,
    'balance', v_income - v_expense,
    'savings_goal', coalesce(v_goal, 1000),
    'savings_progress', case when coalesce(v_goal, 1000) > 0
      then round(((v_income - v_expense) / coalesce(v_goal, 1000)) * 100)
      else 0 end
  );
end;
$$;

-- FIM DA MIGRATION
-- Categorias padrao sugeridas: Alimentacao | Moradia | Transporte | Saude | Educacao | Lazer | Servicos | Outros
select 'Migration aplicada com sucesso!' as status;
