using Microsoft.Data.Sqlite;
using NonExsistentWiki.Server.Models;
using System.Data;
using System.Reflection;

namespace NonExsistentWiki.Server.Services
{
    public class AuthConnection
    {
        private static string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "auth.db");
        public static SqliteConnection DbConnection = new SqliteConnection("Data Source=" + path);
        static Role adminRole = new Role("admin");
        static Role userRole = new Role("user");

        public static User Create(string email, string password)
        {
            if (!IsUserExist(email))
            {
                DbConnection.Open();
                if (DbConnection.State == ConnectionState.Open)
                {
                    User user = new User(email, password, userRole);
                    try
                    {
                        SqliteCommand cmd = new SqliteCommand();
                        cmd.Connection = DbConnection;
                        cmd.CommandText = $"SELECT role FROM roles WHERE role='{userRole}'";
                        cmd.ExecuteNonQuery();
                        DbConnection.Close();
                        cmd.CommandText = $"INSERT INTO users (email, password, role) VALUES ('{user.Email}', '{user.Password}', '{user.Role.Name}')";
                        cmd.ExecuteNonQuery();

                        DbConnection.Close();
                        return user;
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        DbConnection.Close();
                    }
                }
                else
                {
                    Console.WriteLine("Error connection");
                    DbConnection.Close();
                }
            }
            //var lastPost = _dataContext.Posts.LastOrDefault();
            //int newId = lastPost is null ? 1 : lastPost.Id + 1;

            //model.Id = newId;
            //_dataContext.Posts.Add(model);

            return null;
        }

        public static User Get(string email, string password)
        {
            User model = null;
            if (IsUserExist(email))
            {
                DbConnection.Open();
                if (DbConnection.State == ConnectionState.Open)
                {
                    try
                    {
                        SqliteCommand cmd = new SqliteCommand();
                        cmd.Connection = DbConnection;
                        cmd.CommandText = $"SELECT password, role FROM users WHERE email='{email}'";
                        SqliteDataReader reader = cmd.ExecuteReader();
                        while (reader.Read())
                        {
                            if (reader[1].ToString() == adminRole.Name)
                            {
                                model = new User(email, password, adminRole);
                            }
                            else
                            {
                                model = new User(email, password, userRole);
                            }
                        }

                        DbConnection.Close();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        DbConnection.Close();
                    }
                }
                else
                {
                    Console.WriteLine("Error connection");
                    DbConnection.Close();
                }
            }

            return model;
        }

        public List<ObjectModel> Get()
        {
            List<ObjectModel> list = new List<ObjectModel>();
            Dictionary<int, string> types = GetTypes();

            DbConnection.Open();
            if (DbConnection.State == ConnectionState.Open)
            {
                try
                {
                    SqliteCommand cmd = new SqliteCommand();
                    cmd.Connection = DbConnection;
                    cmd.CommandText = $"SELECT id, title, description, type, score FROM furniture";
                    SqliteDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        ObjectModel model = new ObjectModel(Int32.Parse(reader[0].ToString()), reader[1].ToString(), reader[2].ToString(), types[Int32.Parse(reader[3].ToString())], Int32.Parse(reader[4].ToString()));
                        list.Add(model);
                    }

                    DbConnection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    DbConnection.Close();
                }
            }
            else
            {
                Console.WriteLine("Error connection");
                DbConnection.Close();
            }

            return list;
        }

        public Dictionary<int, string> GetTypes()
        {
            Dictionary<int, string> list = new Dictionary<int, string>();
            DbConnection.Open();
            if (DbConnection.State == ConnectionState.Open)
            {
                try
                {
                    SqliteCommand cmd = new SqliteCommand();
                    cmd.Connection = DbConnection;
                    cmd.CommandText = $"SELECT id, type FROM types";
                    SqliteDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        list.Add(Int32.Parse(reader[0].ToString()), reader[1].ToString());
                    }

                    DbConnection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    DbConnection.Close();
                }
            }
            else
            {
                Console.WriteLine("Error connection");
                DbConnection.Close();
            }

            return list;
        }

        public static void SetConnection()
        {
            DbConnection.Open();
            if (DbConnection.State == ConnectionState.Open)
            {
                //Debug.Log("DB open");
                SqliteCommand cmd = new SqliteCommand();
                cmd.Connection = DbConnection;
                cmd.CommandText = "SELECT * FROM objects";
                SqliteDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    // Debug.Log(String.Format("{0} {1}", reader[0], reader[1]));
                }
            }
            else
            {
                // Debug.Log("Error connection");
            }
            DbConnection.Close();
        }

        private static bool IsUserExist(string email)
        {
            DbConnection.Open();
            if (DbConnection.State == ConnectionState.Open)
            {
                try
                {
                    SqliteCommand cmd = new SqliteCommand();
                    cmd.Connection = DbConnection;
                    cmd.CommandText = $"SELECT COUNT(*) FROM users WHERE email='{email}'";
                    SqliteDataReader reader = cmd.ExecuteReader();
                    int userCount = 0;
                    while (reader.Read())
                    {
                        userCount = Int32.Parse(reader[0].ToString());
                    }
                    Console.WriteLine(userCount);
                    if (userCount > 0)
                    {
                        return true;
                    }

                    DbConnection.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    DbConnection.Close();
                }
            }
            else
            {
                Console.WriteLine("Error connection");
                DbConnection.Close();
            }

            return false;
        }
    }
}
