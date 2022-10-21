﻿using System.ComponentModel.DataAnnotations;

namespace DovaPackAPI.DTOs
{
    public class WarehouseCreationDTO
    {
        [Required]
        [StringLength(maximumLength: 100)]
        public string Name { get; set; }

        [Range(-90, 90)]
        public double Latitude { get; set; }

        [Range(-180, 180)]
        public double Longitude { get; set; }
    }
}