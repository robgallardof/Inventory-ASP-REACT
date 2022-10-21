using Azure.Storage.Blobs;

namespace DovaPackAPI.Utils
{
    public class StorageAzure : IStorageFiles
    {
        private string connectionString;

        public StorageAzure(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("AzureStorage");
        }

        public async Task<string> SaveFile(string container, IFormFile file)
        {
            var client = new BlobContainerClient(connectionString, container);
            await client.CreateIfNotExistsAsync();
            client.SetAccessPolicy(Azure.Storage.Blobs.Models.PublicAccessType.Blob);

            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var blob = client.GetBlobClient(fileName);
            await blob.UploadAsync(file.OpenReadStream());

            return blob.Uri.ToString();
        }

        public async Task DeleteFile(string path, string container)
        {
            if (string.IsNullOrEmpty(path))
            {
                return;
            }

            var client = new BlobContainerClient(connectionString, container);
            await client.CreateIfNotExistsAsync();
            var file = Path.GetFileName(path);
            var blob = client.GetBlobClient(file);
            await blob.DeleteIfExistsAsync();
        }

        public async Task<string> EditFile(string container, IFormFile file, string path)
        {
            await DeleteFile(path, container);
            return await SaveFile(container, file);
        }
    }
}