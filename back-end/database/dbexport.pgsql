--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE ridehub; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE ridehub IS 'project forum database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: forum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forum (
    id integer NOT NULL,
    pid integer,
    title character varying NOT NULL,
    description text NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    userid integer NOT NULL
);


ALTER TABLE public.forum OWNER TO postgres;

--
-- Name: forum_followers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forum_followers (
    userid integer NOT NULL,
    forumid integer NOT NULL
);


ALTER TABLE public.forum_followers OWNER TO postgres;

--
-- Name: forum_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.forum_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forum_id_seq OWNER TO postgres;

--
-- Name: forum_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.forum_id_seq OWNED BY public.forum.id;


--
-- Name: gender; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gender (
    id integer NOT NULL,
    type character varying NOT NULL
);


ALTER TABLE public.gender OWNER TO postgres;

--
-- Name: permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission (
    id integer NOT NULL,
    permission_name text NOT NULL
);


ALTER TABLE public.permission OWNER TO postgres;

--
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    id integer NOT NULL,
    userid integer NOT NULL,
    threadid integer NOT NULL,
    pid integer,
    creation_date timestamp with time zone NOT NULL,
    content json[]
);


ALTER TABLE public.post OWNER TO postgres;

--
-- Name: COLUMN post.pid; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.post.pid IS 'to differentiate post and thread';


--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_id_seq OWNER TO postgres;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- Name: post_votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_votes (
    userid integer NOT NULL,
    postid integer NOT NULL
);


ALTER TABLE public.post_votes OWNER TO postgres;

--
-- Name: role_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permission (
    id integer NOT NULL,
    roleid integer NOT NULL,
    permissionid integer NOT NULL
);


ALTER TABLE public.role_permission OWNER TO postgres;

--
-- Name: role_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_permission_id_seq OWNER TO postgres;

--
-- Name: role_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_permission_id_seq OWNED BY public.role_permission.id;


--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    id integer NOT NULL,
    status_name text NOT NULL
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- Name: thread; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thread (
    id integer NOT NULL,
    title character varying NOT NULL,
    userid integer NOT NULL,
    forumid integer NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    thumbnail bytea,
    tag_id integer,
    content character varying NOT NULL
);


ALTER TABLE public.thread OWNER TO postgres;

--
-- Name: thread_followers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thread_followers (
    userid integer NOT NULL,
    threadid integer NOT NULL
);


ALTER TABLE public.thread_followers OWNER TO postgres;

--
-- Name: thread_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.thread_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.thread_id_seq OWNER TO postgres;

--
-- Name: thread_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.thread_id_seq OWNED BY public.thread.id;


--
-- Name: thread_votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thread_votes (
    userid integer NOT NULL,
    threadid integer NOT NULL
);


ALTER TABLE public.thread_votes OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    avatar bytea NOT NULL,
    role_id integer NOT NULL,
    point integer NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    gender_id integer,
    address character varying,
    phone character varying,
    description text,
    last_signin timestamp with time zone,
    birthday character(10),
    status_id integer
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: COLUMN "user".id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".id IS 'account id';


--
-- Name: COLUMN "user".username; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".username IS 'must be unique';


--
-- Name: COLUMN "user".password; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".password IS 'must be hashed';


--
-- Name: COLUMN "user".avatar; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".avatar IS 'account avatar';


--
-- Name: COLUMN "user".role_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".role_id IS 'account role';


--
-- Name: COLUMN "user".point; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".point IS 'gain through posting';


--
-- Name: COLUMN "user".creation_date; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public."user".creation_date IS 'creation date of account';


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_role (
    id integer NOT NULL,
    name character varying NOT NULL,
    description text
);


ALTER TABLE public.user_role OWNER TO postgres;

--
-- Name: forum id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum ALTER COLUMN id SET DEFAULT nextval('public.forum_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Name: role_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission ALTER COLUMN id SET DEFAULT nextval('public.role_permission_id_seq'::regclass);


--
-- Name: thread id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread ALTER COLUMN id SET DEFAULT nextval('public.thread_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: forum; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forum (id, pid, title, description, creation_date, userid) FROM stdin;
1	\N	RideHub	Ridehub mainforum	2018-10-07 22:10:05+07	1
2	1	CAR	Car forum	2018-10-07 22:11:25+07	1
3	2	BMW	BMW sub-forum	2018-10-07 22:11:26+07	1
4	2	ROLL ROYCE	Roll royce sub-forum	2018-10-07 22:11:27+07	1
5	2	FORD	Ford sub-forum	2018-10-07 22:11:28+07	1
6	1	MOTOCYCLE	Motocycle forum	2018-10-07 22:11:25+07	1
7	6	YAMAHA	Yamaha sub-forum	2018-10-07 22:11:26+07	1
8	6	KAWASAKI	Kawasaki sub-forum	2018-10-07 22:11:27+07	1
9	6	SUZUKI	Suzuki sub-forum	2018-10-07 22:11:28+07	1
10	1	BICYCLE	Bicycle forum	2018-10-09 20:09:01+07	1
\.


--
-- Data for Name: forum_followers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forum_followers (userid, forumid) FROM stdin;
4	2
4	3
5	2
5	3
\.


--
-- Data for Name: gender; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.gender (id, type) FROM stdin;
1	Male
2	Female
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permission (id, permission_name) FROM stdin;
1	Create forum
2	Create thread
3	Create post
4	Delete forum
5	Delete post
6	Delete thread
7	Modify forum
8	Modify thread
9	Modify post
10	Delete user
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (id, userid, threadid, pid, creation_date, content) FROM stdin;
1	4	1	\N	2018-10-07 22:46:00+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
2	5	2	\N	2018-10-07 22:46:01+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
3	2	3	\N	2018-10-07 22:46:02+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
4	4	4	\N	2018-10-07 22:46:04+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
5	4	5	\N	2018-10-07 22:46:05+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
6	5	6	\N	2018-10-07 22:46:00+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
7	5	7	\N	2018-10-07 22:46:01+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
8	2	8	\N	2018-10-07 22:46:02+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
9	2	9	\N	2018-10-08 13:26:02+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
10	4	10	\N	2018-10-08 13:26:02+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
11	1	1	1	2018-10-07 22:46:01+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
12	2	1	1	2018-10-07 22:46:01+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
13	2	2	2	2018-10-07 22:46:05+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
14	2	1	1	2018-10-10 23:45:00+07	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
\.


--
-- Data for Name: post_votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_votes (userid, postid) FROM stdin;
1	1
1	2
1	12
2	3
4	1
5	2
\.


--
-- Data for Name: role_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permission (id, roleid, permissionid) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	1	7
8	1	8
9	1	9
10	1	10
11	2	2
12	2	3
13	2	5
14	2	6
15	2	8
16	2	9
17	3	2
18	3	3
19	3	5
20	3	6
21	3	8
22	3	9
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (id, status_name) FROM stdin;
1	Online
2	Offline
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (id, name) FROM stdin;
1	Help
2	Event
3	Sale
4	Discussion
5	Important
\.


--
-- Data for Name: thread; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thread (id, title, userid, forumid, creation_date, thumbnail, tag_id, content) FROM stdin;
1	BMW thread1	4	3	2018-10-07 22:46:00+07	\N	1	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
2	BMW thread2	5	3	2018-10-07 22:46:01+07	\N	1	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
3	BMW thread3	2	3	2018-10-07 22:46:02+07	\N	1	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
4	FORD thread1	4	5	2018-10-07 22:46:04+07	\N	1	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
5	FORD thread2	4	5	2018-10-07 22:46:05+07	\N	1	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
6	YAMAHA thread1	5	7	2018-10-07 22:46:00+07	\N	2	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
7	YAMAHA thread2	5	7	2018-10-07 22:46:01+07	\N	2	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
8	YAMAHA thread3	2	7	2018-10-07 22:46:02+07	\N	2	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
9	ROLL ROYCE thread1	2	4	2018-10-08 13:26:02+07	\N	2	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
10	ROLL ROYCE thread2	4	4	2018-10-08 13:26:02+07	\N	2	{"{\\"insert\\": \\"Hello\\\\n\\"}","{\\"insert\\": \\"This is colorful\\", \\"attributes\\": {\\"color\\": \\"#f00\\"}}"}
\.


--
-- Data for Name: thread_followers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thread_followers (userid, threadid) FROM stdin;
4	1
4	2
5	1
5	2
\.


--
-- Data for Name: thread_votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thread_votes (userid, threadid) FROM stdin;
1	1
2	1
4	1
5	2
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, password, avatar, role_id, point, creation_date, gender_id, address, phone, description, last_signin, birthday, status_id) FROM stdin;
1	admin	thanos	\\x473a5c74726964756e675c5647555c3472645f796561725c50726f6a656374425c696d616765735c69636f6e5f757365722e706e67	1	0	2018-10-04 11:42:25+07	1	\N	\N	\N	\N	\N	\N
2	mode1	123456	\\x473a5c74726964756e675c5647555c3472645f796561725c50726f6a656374425c696d616765735c69636f6e5f757365722e706e67	2	0	2018-10-04 11:42:25+07	1	\N	\N	\N	\N	\N	\N
4	user2	123456	\\x473a5c74726964756e675c5647555c3472645f796561725c50726f6a656374425c696d616765735c69636f6e5f757365722e706e67	3	0	2018-10-04 11:42:25+07	1	\N	\N	\N	\N	\N	\N
5	user1	123456	\\x473a5c74726964756e675c5647555c3472645f796561725c50726f6a656374425c696d616765735c69636f6e5f757365722e706e67	3	0	2018-10-04 11:42:27+07	2	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_role (id, name, description) FROM stdin;
1	Admin	\N
2	Moderator	\N
3	User	\N
4	Non-User	\N
\.


--
-- Name: forum_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forum_id_seq', 10, true);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_id_seq', 14, true);


--
-- Name: role_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_permission_id_seq', 22, true);


--
-- Name: thread_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.thread_id_seq', 10, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 5, true);


--
-- Name: forum category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: forum_followers forum_followers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum_followers
    ADD CONSTRAINT forum_followers_pkey PRIMARY KEY (userid, forumid);


--
-- Name: gender gender_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gender
    ADD CONSTRAINT gender_pkey PRIMARY KEY (id);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: post_votes post_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_votes
    ADD CONSTRAINT post_votes_pkey PRIMARY KEY (userid, postid);


--
-- Name: role_permission role_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_pkey PRIMARY KEY (id);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: thread_followers thread_followers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread_followers
    ADD CONSTRAINT thread_followers_pkey PRIMARY KEY (userid, threadid);


--
-- Name: thread thread_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread
    ADD CONSTRAINT thread_pkey PRIMARY KEY (id);


--
-- Name: thread_votes thread_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread_votes
    ADD CONSTRAINT thread_votes_pkey PRIMARY KEY (userid, threadid);


--
-- Name: user unique_username; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);


--
-- Name: forum_followers forum_followers_forumid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum_followers
    ADD CONSTRAINT forum_followers_forumid_fkey FOREIGN KEY (forumid) REFERENCES public.forum(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: forum_followers forum_followers_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum_followers
    ADD CONSTRAINT forum_followers_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: forum forum_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forum
    ADD CONSTRAINT forum_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: post post_threadid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_threadid_fkey FOREIGN KEY (threadid) REFERENCES public.thread(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post post_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post_votes post_votes_postid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_votes
    ADD CONSTRAINT post_votes_postid_fkey FOREIGN KEY (postid) REFERENCES public.post(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: post_votes post_votes_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_votes
    ADD CONSTRAINT post_votes_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: role_permission role_permission_permissionid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_permissionid_fkey FOREIGN KEY (permissionid) REFERENCES public.permission(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: role_permission role_permission_roleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.user_role(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: thread_followers thread_followers_threadid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread_followers
    ADD CONSTRAINT thread_followers_threadid_fkey FOREIGN KEY (threadid) REFERENCES public.thread(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: thread_followers thread_followers_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread_followers
    ADD CONSTRAINT thread_followers_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: thread thread_forumid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread
    ADD CONSTRAINT thread_forumid_fkey FOREIGN KEY (forumid) REFERENCES public.forum(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: thread thread_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread
    ADD CONSTRAINT thread_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tag(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: thread thread_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread
    ADD CONSTRAINT thread_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: thread_votes thread_votes_threadid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread_votes
    ADD CONSTRAINT thread_votes_threadid_fkey FOREIGN KEY (threadid) REFERENCES public.thread(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: thread_votes thread_votes_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thread_votes
    ADD CONSTRAINT thread_votes_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user user_gender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_gender_id_fkey FOREIGN KEY (gender_id) REFERENCES public.gender(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user user_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.user_role(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: user user_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_status_id_fkey FOREIGN KEY (status_id) REFERENCES public.status(id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

