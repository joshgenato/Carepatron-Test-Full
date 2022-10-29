using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public interface IClientRepository
    {
        Task<Client[]> Get();
        Task<Client[]> Search(string searchKey);
        Task Create(Client client);
        Task Update(Client client);
    }

    public class ClientRepository : IClientRepository
    {
        private readonly DataContext dataContext;

        public ClientRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task Create(Client client)
        {
            client.Id = Guid.NewGuid().ToString();
            await dataContext.AddAsync(client);
            await dataContext.SaveChangesAsync();
        }

        public Task<Client[]> Get()
        {
            return dataContext.Clients.ToArrayAsync();
        }


        public Task<Client[]> Search(string searchKey)
        {
            return dataContext.Clients.Where(c => c.FirstName.ToLower().Contains(searchKey.ToLower()) || c.LastName.ToLower().Contains(searchKey.ToLower())).ToArrayAsync();

        }

        public async Task Update(Client client)
        {
            var existingClient = await dataContext.Clients.FirstOrDefaultAsync(x => x.Id == client.Id);

            if (existingClient == null)
                return;

            existingClient.FirstName = client.FirstName;
            existingClient.LastName = client.LastName;
            existingClient.Email = client.Email;
            existingClient.PhoneNumber = client.PhoneNumber;

            await dataContext.SaveChangesAsync();
        }
    }
}

