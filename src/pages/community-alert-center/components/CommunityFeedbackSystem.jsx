import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const CommunityFeedbackSystem = ({ onSubmitFeedback }) => {
  const [feedbackType, setFeedbackType] = useState('effectiveness');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentFeedback, setRecentFeedback] = useState([
    {
      id: 1,
      type: 'effectiveness',
      rating: 5,
      comment: 'Alert was very clear and helped me prepare in time',
      alertId: 'FLOOD-2024-001',
      submittedAt: new Date(Date.now() - 3600000),
      status: 'reviewed'
    },
    {
      id: 2,
      type: 'timing',
      rating: 4,
      comment: 'Could have been sent 30 minutes earlier',
      alertId: 'STORM-2024-003',
      submittedAt: new Date(Date.now() - 7200000),
      status: 'pending'
    }
  ]);

  const feedbackTypes = [
    { value: 'effectiveness', label: 'Alert Effectiveness', description: 'How helpful was the alert?' },
    { value: 'timing', label: 'Alert Timing', description: 'Was the alert sent at the right time?' },
    { value: 'clarity', label: 'Message Clarity', description: 'How clear was the alert message?' },
    { value: 'accuracy', label: 'Information Accuracy', description: 'How accurate was the alert information?' },
    { value: 'suggestion', label: 'General Suggestion', description: 'Ideas for system improvement' }
  ];

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (rating === 0 || !feedback?.trim()) {
      return;
    }

    setIsSubmitting(true);

    const feedbackData = {
      id: Date.now(),
      type: feedbackType,
      rating,
      comment: feedback,
      alertId: 'CURRENT-ALERT-001',
      submittedAt: new Date(),
      status: 'pending'
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRecentFeedback(prev => [feedbackData, ...prev]);
      setRating(0);
      setFeedback('');
      
      if (onSubmitFeedback) {
        onSubmitFeedback(feedbackData);
      }
      
      console.log('Feedback submitted:', feedbackData);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (rating) => {
    const labels = {
      1: 'Poor',
      2: 'Fair',
      3: 'Good',
      4: 'Very Good',
      5: 'Excellent'
    };
    return labels?.[rating] || '';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reviewed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'rejected': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours}h ago`;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="MessageSquare" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Community Feedback
            </h3>
            <p className="text-sm text-muted-foreground">
              Help us improve our alert system with your feedback
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Feedback Form */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground">
            Share Your Experience
          </h4>

          {/* Feedback Type */}
          <Select
            label="Feedback Category"
            description="What aspect would you like to provide feedback on?"
            options={feedbackTypes}
            value={feedbackType}
            onChange={setFeedbackType}
          />

          {/* Rating System */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Rating {rating > 0 && `(${getRatingLabel(rating)})`}
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  className={`p-1 rounded transition-colors ${
                    star <= rating 
                      ? 'text-warning hover:text-warning/80' :'text-muted-foreground hover:text-warning/50'
                  }`}
                  aria-label={`Rate ${star} stars`}
                >
                  <Icon 
                    name={star <= rating ? "Star" : "Star"} 
                    size={24}
                    className={star <= rating ? "fill-current" : ""}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Click to rate from 1 (poor) to 5 (excellent)
            </p>
          </div>

          {/* Feedback Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Your Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e?.target?.value)}
              placeholder="Please share your thoughts about the alert system..."
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={4}
              maxLength={500}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Be specific to help us improve</span>
              <span>{feedback?.length}/500</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            variant="default"
            iconName="Send"
            iconPosition="left"
            loading={isSubmitting}
            disabled={rating === 0 || !feedback?.trim()}
            onClick={handleSubmit}
            fullWidth
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </div>

        {/* Recent Feedback */}
        <div className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium text-foreground">
              Your Recent Feedback
            </h4>
            <Button variant="ghost" size="sm" iconName="History">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {recentFeedback?.map((item) => (
              <div key={item?.id} className="p-4 border border-border rounded-lg bg-muted/30">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5]?.map((star) => (
                        <Icon
                          key={star}
                          name="Star"
                          size={14}
                          className={`${
                            star <= item?.rating 
                              ? 'text-warning fill-current' :'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {feedbackTypes?.find(t => t?.value === item?.type)?.label}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className={`font-medium ${getStatusColor(item?.status)}`}>
                      {item?.status?.toUpperCase()}
                    </span>
                    <span className="text-muted-foreground">
                      {formatTimeAgo(item?.submittedAt)}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {item?.comment}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Alert ID: {item?.alertId}</span>
                  {item?.status === 'reviewed' && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="CheckCircle" size={12} />
                      <span>Thank you for your feedback!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Statistics */}
        <div className="pt-6 border-t border-border">
          <h4 className="text-md font-medium text-foreground mb-4">
            Community Impact
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">4.2</div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-xs text-muted-foreground">Total Feedback</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-success">89%</div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-xs text-muted-foreground">Improvements</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedbackSystem;