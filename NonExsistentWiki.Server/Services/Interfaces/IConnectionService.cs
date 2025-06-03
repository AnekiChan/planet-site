using NonExsistentWiki.Server.Models;

namespace NonExsistentWiki.Server.Services.Interfaces
{
    public interface IConnectionService
    {
        ObjectModel Update(ObjectModel model);

        ObjectModel Get(int id);

        List<ObjectModel> Get();

        Dictionary<int, string> GetTypes();
    }
}
