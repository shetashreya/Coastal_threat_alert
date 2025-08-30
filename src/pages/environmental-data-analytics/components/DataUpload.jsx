import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DataUpload = ({ onUploadComplete, onValidationError }) => {
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, validating, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationResults, setValidationResults] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const dataTypeOptions = [
    { value: 'tidal', label: 'Tidal Data' },
    { value: 'weather', label: 'Weather Data' },
    { value: 'wind', label: 'Wind Measurements' },
    { value: 'rainfall', label: 'Rainfall Data' },
    { value: 'temperature', label: 'Temperature Readings' },
    { value: 'mixed', label: 'Mixed Environmental Data' }
  ];

  const expectedFormats = {
    tidal: ['timestamp', 'height_m', 'location_id', 'quality_flag'],
    weather: ['timestamp', 'temperature_c', 'humidity_pct', 'pressure_hpa', 'location_id'],
    wind: ['timestamp', 'speed_kmh', 'direction_deg', 'gust_kmh', 'location_id'],
    rainfall: ['timestamp', 'amount_mm', 'intensity_mmh', 'location_id'],
    temperature: ['timestamp', 'temperature_c', 'location_id', 'sensor_type'],
    mixed: ['timestamp', 'parameter', 'value', 'unit', 'location_id']
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = async (file) => {
    if (!selectedDataType) {
      alert('Please select a data type before uploading');
      return;
    }

    if (!file?.name?.toLowerCase()?.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          validateFile(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const validateFile = async (file) => {
    setUploadStatus('validating');
    
    // Simulate file validation
    setTimeout(() => {
      const mockValidation = {
        totalRows: Math.floor(Math.random() * 10000) + 1000,
        validRows: Math.floor(Math.random() * 9000) + 900,
        invalidRows: Math.floor(Math.random() * 100),
        missingColumns: Math.random() > 0.7 ? ['quality_flag'] : [],
        dateRange: {
          start: '2024-08-01T00:00:00Z',
          end: '2024-08-30T23:59:59Z'
        },
        dataQuality: Math.random() > 0.5 ? 'good' : 'fair',
        duplicateRows: Math.floor(Math.random() * 50),
        outliers: Math.floor(Math.random() * 20)
      };

      setValidationResults(mockValidation);
      
      if (mockValidation?.validRows / mockValidation?.totalRows > 0.8) {
        setUploadStatus('success');
        if (onUploadComplete) {
          onUploadComplete({
            file,
            dataType: selectedDataType,
            validation: mockValidation
          });
        }
      } else {
        setUploadStatus('error');
        if (onValidationError) {
          onValidationError(mockValidation);
        }
      }
    }, 2000);
  };

  const resetUpload = () => {
    setUploadStatus('idle');
    setUploadProgress(0);
    setValidationResults(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading': return 'Upload';
      case 'validating': return 'Search';
      case 'success': return 'CheckCircle';
      case 'error': return 'XCircle';
      default: return 'FileText';
    }
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'uploading': return 'text-primary';
      case 'validating': return 'text-warning';
      case 'success': return 'text-success';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon name="Upload" size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Upload</h3>
            <p className="text-sm text-muted-foreground">Import CSV files for environmental data analysis</p>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Data Type Selection */}
        <div>
          <Select
            label="Data Type"
            description="Select the type of environmental data you're uploading"
            options={dataTypeOptions}
            value={selectedDataType}
            onChange={setSelectedDataType}
            placeholder="Choose data type..."
            required
          />
        </div>

        {/* Expected Format Info */}
        {selectedDataType && (
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Expected CSV Format</h4>
            <div className="flex flex-wrap gap-2">
              {expectedFormats?.[selectedDataType]?.map((column, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs font-mono rounded">
                  {column}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ensure your CSV file includes these columns in any order
            </p>
          </div>
        )}

        {/* File Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : uploadStatus === 'success' ?'border-success bg-success/5'
              : uploadStatus === 'error' ?'border-error bg-error/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploadStatus === 'uploading' || uploadStatus === 'validating'}
          />
          
          <div className="space-y-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
              uploadStatus === 'success' ? 'bg-success/10' :
              uploadStatus === 'error'? 'bg-error/10' : 'bg-muted'
            }`}>
              <Icon 
                name={getStatusIcon()} 
                size={24} 
                className={getStatusColor()}
              />
            </div>
            
            {uploadStatus === 'idle' && (
              <>
                <div>
                  <p className="text-lg font-medium text-foreground">Drop your CSV file here</p>
                  <p className="text-sm text-muted-foreground">or click to browse files</p>
                </div>
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  disabled={!selectedDataType}
                >
                  Choose File
                </Button>
              </>
            )}
            
            {uploadStatus === 'uploading' && (
              <div className="space-y-2">
                <p className="text-lg font-medium text-foreground">Uploading...</p>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
              </div>
            )}
            
            {uploadStatus === 'validating' && (
              <div className="space-y-2">
                <p className="text-lg font-medium text-foreground">Validating data...</p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Checking data format and quality</p>
              </div>
            )}
            
            {uploadStatus === 'success' && (
              <div className="space-y-2">
                <p className="text-lg font-medium text-success">Upload successful!</p>
                <p className="text-sm text-muted-foreground">Data has been validated and imported</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetUpload}
                >
                  Upload Another File
                </Button>
              </div>
            )}
            
            {uploadStatus === 'error' && (
              <div className="space-y-2">
                <p className="text-lg font-medium text-error">Upload failed</p>
                <p className="text-sm text-muted-foreground">Please check the validation results below</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetUpload}
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Validation Results */}
        {validationResults && (
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="text-md font-semibold text-foreground mb-4">Validation Results</h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{validationResults?.totalRows?.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Rows</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{validationResults?.validRows?.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Valid Rows</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-error">{validationResults?.invalidRows?.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Invalid Rows</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{validationResults?.duplicateRows}</p>
                <p className="text-xs text-muted-foreground">Duplicates</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Data Quality:</span>
                <span className={`text-sm font-medium ${
                  validationResults?.dataQuality === 'good' ? 'text-success' : 'text-warning'
                }`}>
                  {validationResults?.dataQuality?.charAt(0)?.toUpperCase() + validationResults?.dataQuality?.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Date Range:</span>
                <span className="text-sm text-foreground font-data">
                  {new Date(validationResults.dateRange.start)?.toLocaleDateString()} - {new Date(validationResults.dateRange.end)?.toLocaleDateString()}
                </span>
              </div>
              
              {validationResults?.missingColumns?.length > 0 && (
                <div className="flex items-start justify-between">
                  <span className="text-sm text-foreground">Missing Columns:</span>
                  <div className="flex flex-wrap gap-1">
                    {validationResults?.missingColumns?.map((col, index) => (
                      <span key={index} className="px-2 py-1 bg-error/10 text-error text-xs rounded">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {validationResults?.outliers > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Potential Outliers:</span>
                  <span className="text-sm text-warning font-medium">{validationResults?.outliers} detected</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Upload Guidelines */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Upload Guidelines</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• CSV files should be UTF-8 encoded</li>
            <li>• Maximum file size: 50MB</li>
            <li>• Timestamps should be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)</li>
            <li>• Missing values should be represented as empty cells or 'NULL'</li>
            <li>• Numeric values should use decimal points (not commas)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;