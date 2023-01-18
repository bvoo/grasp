## Create scylla

```sql
CREATE KEYSPACE IF NOT EXISTS notes WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };
USE notes;
CREATE TABLE notes ( id int PRIMARY KEY, title text, content text);
```
