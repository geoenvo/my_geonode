import datetime
from django.db import models
from geonode.base.models import TopicCategory

class Category(models.Model):
    class Meta:
        verbose_name_plural = 'categories'
    
    cat_num = models.CharField(max_length=255, unique=True)
    cat_alp = models.CharField(max_length=255, unique=True)
    cat_name = models.CharField(max_length=255)
    
    def __unicode__(self):
        return u'%s' % (self.cat_name)
        #return u'%s-%s-%s' % (self.cat_num, self.cat_alp, self.cat_name)

class Coverage(models.Model):
    cov_num = models.CharField(max_length=255, unique=True)
    cov_alp = models.CharField(max_length=255, unique=True)
    cov_name = models.CharField(max_length=255)
    
    def __unicode__(self):
        return u'%s' % (self.cov_name)
        #return u'%s-%s-%s' % (self.cov_num, self.cov_alp, self.cov_name)

class Source(models.Model):
    src_num = models.CharField(max_length=255, unique=True)
    src_alp = models.CharField(max_length=255, unique=True)
    src_name = models.CharField(max_length=255)
    
    def __unicode__(self):
        return u'%s' % (self.src_name)
        #return u'%s-%s-%s' % (self.src_num, self.src_alp, self.src_name)

class Year(models.Model):
    year_num = models.IntegerField() # models.IntegerField(default=0)
    year_alp = models.CharField(max_length=255)
    year_name = models.CharField(max_length=255)
    
    def __unicode__(self):
        return u'%s' % (self.year_name)
        #return u'%s-%s-%s' % (str(self.year_num), self.year_alp, self.year_name)

class Main(models.Model):
    category = models.ForeignKey(Category)
    coverage = models.ForeignKey(Coverage)
    source = models.ForeignKey(Source)
    year = models.ForeignKey(Year)
    basename = models.CharField(max_length=255)
    layer = models.ForeignKey('layers.Layer', null=True)
    topic_category = models.ForeignKey(TopicCategory, null=True)
    regions = models.TextField(null=True, blank=True)
    date_created = models.DateTimeField(null=True, default=datetime.datetime.now)
    date_published = models.DateTimeField(null=True, blank=True)
    date_revised = models.DateTimeField(null=True, blank=True)
    document = models.ForeignKey('documents.Document', null=True)
    
    def __unicode__(self):
        return u'%s-%s-%s-%s-%s' % (
            self.category.cat_num,
            self.coverage.cov_num,
            self.source.src_num,
            str(self.year.year_num),
            self.basename
        )

class Slider(models.Model):
    image = models.ImageField(upload_to='icraf_dr_slider', help_text='the slide image, use 1200x600 pixel images for best results')
    position = models.PositiveIntegerField(null=True, blank=True, help_text='position determines the order of the slide, smaller value is shown first')
    description = models.TextField(max_length=512, blank=True, help_text='the text in the slide body, can use html')
    link = models.CharField(max_length=512, blank=True, help_text='a link to an internal or external resource, example: /layers/')
    link_text = models.CharField(max_length=512, blank=True, help_text='the text in the link button')
    is_published = models.BooleanField(default=False, help_text='only published slides are shown')
    