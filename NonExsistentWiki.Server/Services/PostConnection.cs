using static System.Net.Mime.MediaTypeNames;
using System.Data;
using System.Diagnostics;
using Microsoft.Data.Sqlite;
using NonExsistentWiki.Server.Models;
using System.Resources;
using NonExsistentWiki.Server.Services.Interfaces;
using System.Reflection;

namespace NonExsistentWiki.Server.Services
{
    public class PostConnection
    {
        private static string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "db.bytes");
        public static SqliteConnection DbConnection = new SqliteConnection("Data Source=" + path);

        public static ObjectModel Update(ObjectModel model)
        {
            DbConnection.Open();
            if (DbConnection.State == ConnectionState.Open)
            {
                try
                {
                    SqliteCommand cmd = new SqliteCommand();
                    cmd.Connection = DbConnection;
                    cmd.CommandText = $"UPDATE planets SET title='{model.Title}', type=(SELECT id FROM types WHERE type='{model.Type}'), description='{model.Description}', score={model.Score} WHERE id={model.Id}";

                    cmd.ExecuteNonQuery(); // только это нужно

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
            return model;
        }


        public static ObjectModel Get(int id)
        {
            ObjectModel model = null;
            Dictionary<int, string> types = GetTypes();

            DbConnection.Open();
            if (DbConnection.State == ConnectionState.Open)
            {
                try
                {
                    SqliteCommand cmd = new SqliteCommand();
                    cmd.Connection = DbConnection;
                    cmd.CommandText = $"SELECT id, title, description, type, score FROM planets WHERE id={id}";
                    SqliteDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        model = new ObjectModel(Int32.Parse(reader[0].ToString()), reader[1].ToString(), reader[2].ToString(), types[Int32.Parse(reader[3].ToString())], Int32.Parse(reader[4].ToString()));
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

            return model;
        }

        public static List<ObjectModel> Get()
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
                    cmd.CommandText = $"SELECT id, title, description, type, score FROM planets";
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

        public static Dictionary<int, string> GetTypes()
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
    }
}
