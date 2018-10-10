-- api request
--  Account short information
SELECT avatar, username, point, r.name 
AS role FROM public.user u 
INNER JOIN user_role r 
ON u.role_id = r.id 
WHERE u.id = '1'

--  Account short information
SELECT username, avatar, point, g.type AS gender, address,phone, description, birthday
FROM public.user u
INNER JOIN gender g
ON u.gender_id = g.id
WHERE u.id = '1'

-- Subforum pid 0 information
WITH forum_details AS(
	SELECT f.id, f.title, f.description, string_agg(sf.id::character varying, ',') AS child,
	CASE WHEN ff.userid IS NULL THEN false
	ELSE true
        END AS user_following_state
	FROM forum f
	LEFT JOIN forum sf
	ON f.id = sf.pid
	LEFT JOIN forum_followers ff
	ON f.id = ff.forumid AND ff.userid = 2
	WHERE f.pid = 1
	GROUP BY (f.id, f.title, f.description,ff.userid)
)
SELECT fd.*,COUNT(ff.userid) AS followers,
CASE WHEN fd.child IS NULL THEN 1
		ELSE 0 
        END AS type  
FROM forum_details fd
LEFT JOIN forum_followers ff
ON fd.id = ff.forumid
GROUP BY (fd.id,fd.title,fd.description,fd.child,fd.user_following_state);

-- Subforum information
WITH forum_details AS(
	SELECT f.id, f.title, f.description, string_agg(sf.id::character varying, ',') AS child,
	CASE WHEN ff.userid IS NULL THEN false
	ELSE true
        END AS user_following_state
	FROM forum f
	LEFT JOIN forum sf
	ON f.id = sf.pid
	LEFT JOIN forum_followers ff
	ON f.id = ff.forumid AND ff.userid = 2
	WHERE f.id = 2
	GROUP BY (f.id, f.title, f.description,ff.userid)
)
SELECT fd.*,COUNT(ff.userid) AS followers,
CASE WHEN fd.child IS NULL THEN 1
		ELSE 0 
        END AS type  
FROM forum_details fd
LEFT JOIN forum_followers ff
ON fd.id = ff.forumid
GROUP BY (fd.id,fd.title,fd.description,fd.child,fd.user_following_state);

-- Thread information
WITH thread_details AS(
	SELECT t.id,t.title,t.thumbnail,tag.name AS tag
	FROM thread t
	LEFT JOIN tag 
	ON t.tag_id = tag.id
	WHERE t.id = 1
	GROUP BY (t.id,t.title,t.thumbnail,tag.name)
)
SELECT td.*, string_agg(p.id::character varying, ',') AS child
FROM thread_details td
LEFT JOIN post p
ON td.id = p.threadid
GROUP BY (td.id,td.title,td.thumbnail,td.tag);

-- Post information
WITH post_withuser AS(
	SELECT p.id,u.avatar AS user_post,
	CASE WHEN pv.userid IS NULL THEN false
		ELSE true 
    	END AS user_vote_state  
	FROM post p
	LEFT JOIN post_votes pv
	ON p.id = pv.postid AND pv.userid = 1
	LEFT JOIN public.user u
	ON p.userid = u.id
	WHERE p.id = 2
), post_withvote AS (
	SELECT pu.*, COUNT(pv.userid) AS vote_number
	FROM post_withuser pu
	INNER JOIN post_votes pv
	ON pu.id = pv.postid
	GROUP BY(pu.id,pu.user_post,pu.user_vote_state)
)
SELECT pv.*, p.content
FROM post_withvote pv
INNER JOIN post p
ON pv.id = p.id;