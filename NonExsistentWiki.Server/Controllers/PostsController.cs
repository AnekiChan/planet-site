using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NonExsistentWiki.Server.Models;
using NonExsistentWiki.Server.Services;
using NonExsistentWiki.Server.Services.Interfaces;

namespace NonExsistentWiki.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        [HttpPatch]
        public ObjectModel Update(ObjectModel model)
        {
            return PostConnection.Update(model);
        }

        [HttpGet("{id}")]
        public ObjectModel Get(int id)
        {
            return PostConnection.Get(id);
        }

        [HttpGet]
        public IEnumerable<ObjectModel> GetAll()
        {
            return PostConnection.Get();
        }

        [HttpGet("types")]
        public IEnumerable<string> GetTypes()
        {
            return PostConnection.GetTypes().Values;
        }
    }
}
