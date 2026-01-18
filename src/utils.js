/**
 * Intelligent Automation System - Utility Functions
 * Reusable code snippets for n8n Code nodes
 */

// ============================================
// LEAD SCORING ALGORITHM
// ============================================

/**
 * Calculate lead qualification score based on collected data
 * @param {Object} data - Lead data object
 * @returns {number} Score between 0-100
 */
function calculateLeadScore(data) {
  let score = 0;
  
  // Goal provided: +20
  if (data.goal) score += 20;
  
  // Budget scoring: higher budget = higher score
  if (data.budget) {
    if (data.budget >= 50000) score += 30;
    else if (data.budget >= 20000) score += 25;
    else if (data.budget >= 5000) score += 15;
    else score += 10;
  }
  
  // Timeline urgency: shorter = higher
  if (data.timeline) {
    const timeline = data.timeline.toLowerCase();
    if (timeline.includes('week') || timeline.includes('day')) score += 20;
    else if (timeline.includes('month')) score += 15;
    else score += 10;
  }
  
  // Industry provided: +10
  if (data.industry) score += 10;
  
  // Contact email provided: +20 (shows intent)
  if (data.contactEmail) score += 20;
  
  return Math.min(score, 100);
}

/**
 * Determine lead temperature based on score
 * @param {number} score - Qualification score
 * @returns {string} 'hot', 'warm', or 'cold'
 */
function getLeadTemperature(score) {
  if (score >= 70) return 'hot';
  if (score >= 50) return 'warm';
  return 'cold';
}

// ============================================
// INTENT DETECTION
// ============================================

/**
 * Detect user intent from message text
 * @param {string} message - User message
 * @returns {Object} Detected intent with type and value
 */
function detectIntent(message) {
  const lowerMsg = message.toLowerCase();
  
  // Budget detection
  const budgetMatch = lowerMsg.match(/\$?([\d,]+)(?:k|\s*thousand)?|budget\s*(?:is|of)?\s*\$?([\d,]+)/i);
  if (budgetMatch) {
    let budget = parseInt((budgetMatch[1] || budgetMatch[2]).replace(/,/g, ''));
    if (lowerMsg.includes('k') || lowerMsg.includes('thousand')) budget *= 1000;
    return { type: 'budget', value: budget };
  }
  
  // Goal detection
  const goalKeywords = ['lead gen', 'lead generation', 'sales', 'marketing', 'growth', 'automation', 'optimize', 'scale'];
  for (const keyword of goalKeywords) {
    if (lowerMsg.includes(keyword)) {
      return { type: 'goal', value: keyword };
    }
  }
  
  // Timeline detection
  const timelineMatch = lowerMsg.match(/(\d+)\s*(day|week|month|quarter|year)/i);
  if (timelineMatch) {
    return { type: 'timeline', value: `${timelineMatch[1]} ${timelineMatch[2]}s` };
  }
  
  // Email detection
  const emailMatch = lowerMsg.match(/[\w.-]+@[\w.-]+\.\w+/i);
  if (emailMatch) {
    return { type: 'contactEmail', value: emailMatch[0] };
  }
  
  // Industry detection
  const industries = ['tech', 'technology', 'healthcare', 'finance', 'retail', 'ecommerce', 'saas', 'b2b', 'b2c', 'manufacturing'];
  for (const ind of industries) {
    if (lowerMsg.includes(ind)) {
      return { type: 'industry', value: ind };
    }
  }
  
  return { type: 'unknown', value: message };
}

// ============================================
// METRICS ANALYSIS
// ============================================

/**
 * Analyze metrics and identify issues/opportunities
 * @param {Array} metricsData - Array of metric records
 * @returns {Object} Analysis results
 */
function analyzeMetrics(metricsData) {
  // Calculate aggregate metrics
  const totalLeads = metricsData.reduce((sum, m) => sum + m.leads, 0);
  const totalQualified = metricsData.reduce((sum, m) => sum + m.qualified, 0);
  const totalConverted = metricsData.reduce((sum, m) => sum + m.converted, 0);
  const totalRevenue = metricsData.reduce((sum, m) => sum + m.revenue, 0);
  const avgCPA = metricsData.reduce((sum, m) => sum + m.cpa, 0) / metricsData.length;
  const avgConversionRate = totalQualified > 0 ? (totalConverted / totalQualified * 100) : 0;
  
  // Calculate trends
  const recent = metricsData.slice(0, 7);
  const previous = metricsData.slice(7, 14);
  const recentConvRate = recent.reduce((sum, m) => sum + m.conversionRate, 0) / recent.length || 0;
  const prevConvRate = previous.reduce((sum, m) => sum + m.conversionRate, 0) / previous.length || 0;
  const conversionTrend = recentConvRate - prevConvRate;
  
  // Identify issues
  const issues = [];
  if (avgConversionRate < 30) {
    issues.push({
      type: 'LOW_CONVERSION',
      message: `Conversion rate (${avgConversionRate.toFixed(1)}%) is below 30% target`,
      severity: 'high'
    });
  }
  if (avgCPA > 100) {
    issues.push({
      type: 'HIGH_CPA',
      message: `CPA ($${avgCPA.toFixed(2)}) exceeds $100 target`,
      severity: 'medium'
    });
  }
  if (conversionTrend < -5) {
    issues.push({
      type: 'DECLINING_PERFORMANCE',
      message: `Conversion rate declining by ${Math.abs(conversionTrend).toFixed(1)}%`,
      severity: 'high'
    });
  }
  
  return {
    aggregates: { totalLeads, totalQualified, totalConverted, totalRevenue, avgCPA, avgConversionRate },
    trends: { conversionTrend, direction: conversionTrend > 0 ? 'improving' : conversionTrend < 0 ? 'declining' : 'stable' },
    issues,
    requiresOptimization: issues.some(i => i.severity === 'high')
  };
}

// ============================================
// ROI CALCULATIONS
// ============================================

/**
 * Calculate ROI metrics for the automation system
 * @param {Object} params - Parameters for ROI calculation
 * @returns {Object} ROI metrics
 */
function calculateROI(params) {
  const {
    toolsCost = 200,
    laborHoursSaved = 40,
    laborCostPerHour = 50,
    referralRevenue = 0,
    estimatedLeadValue = 0
  } = params;
  
  const laborSavings = laborHoursSaved * laborCostPerHour;
  const totalBenefit = laborSavings + referralRevenue + estimatedLeadValue;
  const roi = ((totalBenefit - toolsCost) / toolsCost * 100);
  
  return {
    monthlyCost: toolsCost,
    laborSavings,
    totalBenefit,
    roi: roi.toFixed(1) + '%',
    paybackPeriod: totalBenefit > toolsCost ? 'Immediate' : 'N/A'
  };
}

// ============================================
// WORKFLOW GENERATION HELPERS
// ============================================

/**
 * Generate a basic workflow template
 * @param {string} name - Workflow name
 * @param {string} type - Workflow type
 * @returns {Object} n8n workflow JSON structure
 */
function generateWorkflowTemplate(name, type) {
  const baseId = Date.now();
  
  const templates = {
    'follow-up': {
      name: `Generated: ${name}`,
      nodes: [
        {
          id: `trigger-${baseId}`,
          name: 'Start',
          type: 'n8n-nodes-base.manualTrigger',
          typeVersion: 1,
          position: [240, 300],
          parameters: {}
        },
        {
          id: `wait-${baseId}`,
          name: 'Wait Period',
          type: 'n8n-nodes-base.wait',
          typeVersion: 1.1,
          position: [460, 300],
          parameters: { amount: 3, unit: 'days' }
        },
        {
          id: `action-${baseId}`,
          name: 'Send Follow-up',
          type: 'n8n-nodes-base.emailSend',
          typeVersion: 2.1,
          position: [680, 300],
          parameters: {}
        }
      ],
      connections: {
        'Start': { main: [[{ node: 'Wait Period', type: 'main', index: 0 }]] },
        'Wait Period': { main: [[{ node: 'Send Follow-up', type: 'main', index: 0 }]] }
      }
    },
    'notification': {
      name: `Generated: ${name}`,
      nodes: [
        {
          id: `trigger-${baseId}`,
          name: 'Webhook',
          type: 'n8n-nodes-base.webhook',
          typeVersion: 2,
          position: [240, 300],
          parameters: { path: 'notify', httpMethod: 'POST' }
        },
        {
          id: `notify-${baseId}`,
          name: 'Send Notification',
          type: 'n8n-nodes-base.httpRequest',
          typeVersion: 4.2,
          position: [460, 300],
          parameters: { method: 'POST' }
        }
      ],
      connections: {
        'Webhook': { main: [[{ node: 'Send Notification', type: 'main', index: 0 }]] }
      }
    }
  };
  
  return templates[type] || templates['follow-up'];
}

// Export for use in n8n Code nodes
module.exports = {
  calculateLeadScore,
  getLeadTemperature,
  detectIntent,
  analyzeMetrics,
  calculateROI,
  generateWorkflowTemplate
};
